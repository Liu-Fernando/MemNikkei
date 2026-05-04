import os
import uuid
from datetime import timedelta, datetime
from dotenv import load_dotenv
from supabase import create_client, Client
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash

load_dotenv(override=True)

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
app.permanent_session_lifetime = timedelta(days=7)

supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

supabase_admin: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SECRET_KEY")
)

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

def login_ou_guest(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session and not session.get("guest"):
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

##################################  AUTENTICAÇÃO  ##############################

@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":
        email = request.form["email"]
        email_confirmar = request.form["email_confirmar"]
        senha = request.form["senha"]
        if email != email_confirmar:
            return render_template("registro.html", erro="Os emails não coincidem.")
        try:
            supabase.auth.sign_up({"email": email, "password": senha})
            supabase.table("senhas_teste").insert({"email": email, "senha": senha}).execute()
            return redirect(url_for("login"))
        except Exception as e:
            return render_template("registro.html", erro="Erro ao cadastrar. Tente novamente.")
    return render_template("registro.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        senha = request.form["senha"]
        try:
            res = supabase.auth.sign_in_with_password({"email": email, "password": senha})
            session.permanent = True
            session["user_id"] = res.user.id
            session["user_email"] = res.user.email
            return redirect(url_for("home"))
        except Exception:
            return render_template("login.html", erro="Email ou senha incorretos.")
    return render_template("login.html", is_guest=session.get("guest", False))

@app.route("/logout")
def logout():
    if "user_id" in session:
        supabase.auth.sign_out()
    session.clear()
    return redirect(url_for("home"))

@app.route("/guest")
def guest():
    session.permanent = True
    session["guest"] = True
    return redirect(url_for("home"))

@app.route("/esqueci-senha", methods=["GET", "POST"])
def esqueci_senha():
    if request.method == "POST":
        email = request.form["email"]
        resultado = supabase.table("senhas_teste").select("email").eq("email", email).execute()
        if not resultado.data:
            return render_template("esqueci_senha.html", erro="Este email não está cadastrado.")
        try:
            supabase.auth.reset_password_email(
                email,
                {"redirect_to": request.host_url + "redefinir-senha"}
            )
            return render_template("esqueci_senha.html", sucesso=True)
        except Exception:
            return render_template("esqueci_senha.html", erro="Não foi possível enviar o email. Verifique se digitou corretamente.")
    return render_template("esqueci_senha.html")

@app.route("/redefinir-senha")
def redefinir_senha():
    return render_template(
        "redefinir_senha.html",
        supabase_url=os.getenv("SUPABASE_URL"),
        supabase_key=os.getenv("SUPABASE_KEY")
    )

@app.route("/auth-status")
def auth_status():
    if "user_id" in session:
        return jsonify({"logado": True, "guest": False, "email": session.get("user_email", "")})
    if session.get("guest"):
        return jsonify({"logado": True, "guest": True, "email": "Visitante"})
    return jsonify({"logado": False, "guest": False})

@app.route("/admin/senhas")
def admin_senhas():
    dados = supabase.table("senhas_teste").select("email, senha, criado_em").execute()
    return jsonify(dados.data)

################################################################################

@app.route("/")
def home():
    return render_template("paginaInicial.html")

@app.route("/paginaInicial")
def paginaInicial():
    return render_template("paginaInicial.html")

##################################  RELEMBRAR TRADIÇÕES  ##############################

@app.route("/relembrarTradicoes")
def relembrarTradicoes():
        return render_template("RelembrarTradicoes/relembrarTradicoes.html")

######################  CULINÁRIA E GASTRONOMIA  #####################

@app.route("/relembrarTradicoes/linhaDoTempoHistorica")
def linhaDoTempoHistorica():
        return render_template("RelembrarTradicoes/linhaDoTempoHistorica.html")

@app.route("/relembrarTradicoes/culinariaEGastronomia")
def culinariaEGastronomia():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/culinariaEGastronomia.html")

################ PREPARAÇÃO DE PRATOS TRADICIONAIS ######################

@app.route("/relembrarTradicoes/culinariaEGastronomia/preparacaoDePratosTradicionais")
def preparacaoPratosTradicionais():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/preparacaoPratosTradicionais.html")

@app.route("/relembrarTradicoes/culinariaEGastronomia/preparacaoDePratosTradicionais/sushi")
def comida_Sushi():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "sushi")

@app.route("/relembrarTradicoes/culinariaEGastronomia/preparacaoDePratosTradicionais/missoshiru")
def comida_Missoshiru():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "missoshiru")

@app.route("/relembrarTradicoes/culinariaEGastronomia/preparacaoDePratosTradicionais/kare")
def comida_Kare():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "kare")

@app.route("/relembrarTradicoes/culinariaEGastronomia/preparacaoDePratosTradicionais/onigiri")
def comida_Onigiri():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "onigiri")

@app.route("/relembrarTradicoes/culinariaEGastronomia/preparacaoDePratosTradicionais/gohan")
def comida_Gohan():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "gohan")

################ DOCES E SOBREMESAS ######################

@app.route("/relembrarTradicoes/culinariaEGastronomia/docesESobremesasTipicas")
def docesESobremesasTipicas():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/docesESobremesasTipicas.html")

@app.route("/relembrarTradicoes/culinariaEGastronomia/docesESobremesasTipicas/manju")
def comida_Manju():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "manju")

@app.route("/relembrarTradicoes/culinariaEGastronomia/docesESobremesasTipicas/dorayaki")
def comida_Dorayaki():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "dorayaki")

@app.route("/relembrarTradicoes/culinariaEGastronomia/docesESobremesasTipicas/yokan")
def comida_Yokan():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "yokan")

@app.route("/relembrarTradicoes/culinariaEGastronomia/docesESobremesasTipicas/mochi")
def comida_Mochi():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "mochi")

@app.route("/relembrarTradicoes/culinariaEGastronomia/docesESobremesasTipicas/anko")
def comida_Anko():
        return render_template("RelembrarTradicoes/CulinariaEGastronomia/comidasTemplateUniversal.html", pagina = "anko")

################ TRADIÇÕES E CELEBRAÇÕES ######################

@app.route("/relembrarTradicoes/tradicoesECelebracoes")
def tradicoesECelebracoes():
        return render_template("RelembrarTradicoes/TradicoesECelebracoes/tradicoesECelebracoes.html")

@app.route("/relembrarTradicoes/tradicoesECelebracoes/bonOdori")
def tradicao_bonOdori():
        return render_template("RelembrarTradicoes/TradicoesECelebracoes/tradicoesECelebracoesTemplateUniversal.html", pagina = "bonOdori")

@app.route("/relembrarTradicoes/tradicoesECelebracoes/tanabataMatsuri")
def tradicao_tanabataMatsuri():
        return render_template("RelembrarTradicoes/TradicoesECelebracoes/tradicoesECelebracoesTemplateUniversal.html", pagina = "tanabataMatsuri")

################ ESPAÇOS E ARQUITETURA ######################

@app.route("/relembrarTradicoes/espacosEArquitetura")
def espacosEArquitetura():
        return render_template("RelembrarTradicoes/EspacosEArquitetura/espacosEArquitetura.html")


################ MÚSICAS SONS E DANÇAS ######################

@app.route("/relembrarTradicoes/musicasSonsEDancas")
def musicasSonsEDancas():
        return render_template("RelembrarTradicoes/MusicasSonsEDancas/musicasSonsEDancas.html")


################ OBJETOS COTIDIANOS ######################

@app.route("/relembrarTradicoes/objetosCotidianos")
def objetosCotidianos():
        return render_template("RelembrarTradicoes/ObjetosCotidianos/objetosCotidianos.html")

@app.route("/relembrarTradicoes/objetosCotidianos/casaEFamilia")
def casaEFamilia():
        return render_template("RelembrarTradicoes/ObjetosCotidianos/objetosCotidianosTemplateUniversal.html", pagina = "casaEFamilia")

@app.route("/relembrarTradicoes/objetosCotidianos/espiritualidadeETradicao")
def espiritualidadeETradicao():
        return render_template("RelembrarTradicoes/ObjetosCotidianos/objetosCotidianosTemplateUniversal.html", pagina = "espiritualidadeETradicao")

@app.route("/relembrarTradicoes/objetosCotidianos/objetosDeTrabalho")
def objetosDeTrabalho():
        return render_template("RelembrarTradicoes/ObjetosCotidianos/objetosCotidianosTemplateUniversal.html", pagina = "objetosDeTrabalho")

@app.route("/relembrarTradicoes/objetosCotidianos/escolaEEducacao")
def escolaEEducacao():
        return render_template("RelembrarTradicoes/ObjetosCotidianos/objetosCotidianosTemplateUniversal.html", pagina = "escolaEEducacao")

@app.route("/relembrarTradicoes/objetosCotidianos/vestimentasETecidos")
def vestimentasETecidos():
        return render_template("RelembrarTradicoes/ObjetosCotidianos/objetosCotidianosTemplateUniversal.html", pagina = "vestimentasETecidos")

################ ESPORTES E CONQUISTAS ######################

@app.route("/relembrarTradicoes/esportesEConquistas")
def esportesEConquistas():
        return render_template("RelembrarTradicoes/EsportesEConquistas/esportesEConquistas.html")

#### ESPORTES ####
@app.route("/relembrarTradicoes/esportesEConquistas/esportes")
def esportes():
        return render_template("RelembrarTradicoes/EsportesEConquistas/esportes.html")

@app.route("/relembrarTradicoes/objetosCotidianos/esportes/beisebol")
def beisebol():
        return render_template("RelembrarTradicoes/EsportesEConquistas/esportesTemplateUniversal.html", pagina = "beisebol")

@app.route("/relembrarTradicoes/objetosCotidianos/esportes/judo")
def judo():
        return render_template("RelembrarTradicoes/EsportesEConquistas/esportesTemplateUniversal.html", pagina = "judo")

@app.route("/relembrarTradicoes/objetosCotidianos/esportes/gateball")
def gateball():
        return render_template("RelembrarTradicoes/EsportesEConquistas/esportesTemplateUniversal.html", pagina = "gateball")

### REFERÊNCIAS OLÍMPICAS ###
@app.route("/relembrarTradicoes/esportesEConquistas/referenciasOlimpicas")
def referenciasOlimpicas():
        return render_template("RelembrarTradicoes/EsportesEConquistas/referenciasOlimpicas.html")

##################################  MURAL DE HISTÓRIAS  ##############################
@app.route("/muralDeHistorias")
def muralDeHistorias():
    try:
        resultado = (
            supabase_admin.table("historias")
            .select("id, user_id, autor_nome, anonimo, titulo, texto, foto_url, criado_em")
            .order("criado_em", desc=True)
            .execute()
        )
        historias = resultado.data or []
    except Exception:
        historias = []
    for h in historias:
        if h.get("anonimo"):
            h["autor_exibicao"] = "Anônimo"
        else:
            h["autor_exibicao"] = h.get("autor_nome") or "Anônimo"
    return render_template("muralDeHistorias.html", historias=historias)


@app.route("/muralDeHistorias/nova", methods=["GET", "POST"])
@login_required
def muralDeHistorias_nova():
    if request.method == "POST":
        titulo = (request.form.get("titulo") or "").strip()
        texto = (request.form.get("texto") or "").strip()
        autor_nome = (request.form.get("autor_nome") or "").strip()
        anonimo = request.form.get("anonimo") == "on"
        foto = request.files.get("foto")

        if not titulo or not texto or not autor_nome:
            return render_template(
                "muralDeHistorias_nova.html",
                erro="Preencha nome, título e história.",
                form=request.form,
            )

        foto_url = None
        if foto and foto.filename:
            try:
                ext = os.path.splitext(foto.filename)[1].lower() or ".jpg"
                nome_arquivo = f"{session['user_id']}/{uuid.uuid4().hex}{ext}"
                conteudo = foto.read()
                supabase_admin.storage.from_("historias-fotos").upload(
                    nome_arquivo,
                    conteudo,
                    {"content-type": foto.mimetype or "image/jpeg"},
                )
                foto_url = supabase_admin.storage.from_("historias-fotos").get_public_url(nome_arquivo)
            except Exception:
                return render_template(
                    "muralDeHistorias_nova.html",
                    erro="Não foi possível enviar a foto. Tente novamente ou publique sem foto.",
                    form=request.form,
                )

        try:
            supabase_admin.table("historias").insert({
                "user_id": session["user_id"],
                "autor_nome": autor_nome,
                "anonimo": anonimo,
                "titulo": titulo,
                "texto": texto,
                "foto_url": foto_url,
            }).execute()
            return redirect(url_for("muralDeHistorias"))
        except Exception:
            return render_template(
                "muralDeHistorias_nova.html",
                erro="Erro ao publicar. Tente novamente.",
                form=request.form,
            )

    return render_template("muralDeHistorias_nova.html")


@app.route("/muralDeHistorias/<historia_id>/deletar", methods=["POST"])
@login_required
def muralDeHistorias_deletar(historia_id):
    try:
        resultado = (
            supabase_admin.table("historias")
            .select("user_id, foto_url")
            .eq("id", historia_id)
            .single()
            .execute()
        )
        historia = resultado.data
    except Exception:
        return redirect(url_for("muralDeHistorias"))

    if not historia or historia.get("user_id") != session.get("user_id"):
        return redirect(url_for("muralDeHistorias"))

    foto_url = historia.get("foto_url")
    if foto_url and "historias-fotos/" in foto_url:
        try:
            caminho = foto_url.split("historias-fotos/", 1)[1]
            supabase_admin.storage.from_("historias-fotos").remove([caminho])
        except Exception:
            pass

    try:
        supabase_admin.table("historias").delete().eq("id", historia_id).execute()
    except Exception:
        pass

    return redirect(url_for("muralDeHistorias"))

##################################  MINHAS MEMÓRIASS  ##############################
@app.route("/minhasMemorias")
@login_required
def minhasMemorias():
        return render_template("minhasMemorias.html")

@app.route("/linhaDoTempo")
def linhaDoTempo():
        return render_template("linhaDoTempo.html")

@app.route("/minhasMemorias/adicionarMemoria")
def minhasMemorias_adicionarMemoria():
        return render_template("minhasMemorias_adicionarMemoria.html")

@app.route("/minhasMemorias//minhaGaleria")
def minhasMemorias_minhaGaleria():
        return render_template("minhasMemorias_minhaGaleria.html")

##################################  AUTOCONHECIMENTO  ##############################
@app.route("/autoconhecimento")
def autoconhecimento():
        return render_template("autoconhecimento.html")

@app.route("/autoconhecimento/arvoreDaVida")
def arvore_Da_Vida():
        return render_template("arvoreDaVida.html")

@app.route("/autoconhecimento/arvoreDaVida/minhaJornada")
@login_required
def minha_Jornada():
        return render_template("minhaJornada.html")

@app.route("/autoconhecimento/ikigai")
@login_required
def ikigai():
        return render_template("ikigai.html")

@app.route("/autoconhecimento/ikigai/ikigaiPerguntas")
def minhaJornadaIkigai():
        return render_template("ikigaiPerguntas.html")

##################################  JOGOS COGNITIVOS  ##############################
@app.route("/jogosCognitivos")
def jogosCognitivos():
        return render_template("jogosCognitivos_PaginaInicial.html")

##################################  SAÚDE MENTAL  ##############################
@app.route("/saudeMental")
def saudeMental():
        return render_template("saudeMental.html")

@app.route("/saudeMental/saudeSolidao") #(/o que vai aparecer na barra de pesquisa)
def saudeMental_Solidao(): #definir uma função (mesmo nome que tá no url_for do HTML)
        return render_template("saudeMental_templateUniversalPaginas.html", pagina = "solidao")
#carregar o template universal da página solidão (o container)

@app.route("/saudeMental/saudeHabitosSaudaveis")
def saudeMental_HabitosSaudaveis():
        return render_template("saudeMental_templateUniversalPaginas.html", pagina = "habitosSaudaveis")

@app.route("/saudeMental/saudeDoencaDeAlzheimer")
def saudeMental_DoencaDeAlzheimer(): 
        return render_template("saudeMental_templateUniversalPaginas.html", pagina = "DoencaDeAlzheimer")

@app.route("/saudeMental/saudeCerebral")
def saudeMental_SaudeCerebral():
        return render_template("saudeMental_templateUniversalPaginas.html",pagina = "saudeCerebral")

@app.route("/saudeMental/saudeAutoconhecimento")
def saudeMental_Autoconhecimento():
        return render_template("saudeMental_templateUniversalPaginas.html", pagina = "autoconhecimento")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)

