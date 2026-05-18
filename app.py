import os
import uuid
import requests
from datetime import timedelta, datetime
from dotenv import load_dotenv
from supabase import create_client, Client
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash, send_from_directory

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

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'MemLogo.png', mimetype='image/png')


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

@app.route("/minhasMemorias/adicionarMemoria", methods=["GET", "POST"])
@login_required
def minhasMemorias_adicionarMemoria():
    if request.method == "POST":
        titulo = (request.form.get("tituloMemoria") or "").strip()
        data_memoria = (request.form.get("dataMemoria") or "").strip()
        local = (request.form.get("localMemoria") or "").strip()
        descricao = (request.form.get("descricao") or "").strip()
        foto = request.files.get("selecionarArquivos")

        if not data_memoria:
            return render_template(
                "minhasMemorias_adicionarMemoria.html",
                erro="A data da memória é obrigatória.",
                form=request.form,
            )

        foto_url = None
        if foto and foto.filename:
            try:
                ext = os.path.splitext(foto.filename)[1].lower() or ".jpg"
                nome_arquivo = f"{session['user_id']}/{uuid.uuid4().hex}{ext}"
                conteudo = foto.read()
                supabase_admin.storage.from_("memorias-fotos").upload(
                    nome_arquivo,
                    conteudo,
                    {"content-type": foto.mimetype or "image/jpeg"},
                )
                foto_url = nome_arquivo
            except Exception:
                return render_template(
                    "minhasMemorias_adicionarMemoria.html",
                    erro="Não foi possível enviar a foto. Tente novamente ou salve sem foto.",
                    form=request.form,
                )

        try:
            supabase_admin.table("galeria_memorias").insert({
                "user_id": session["user_id"],
                "titulo": titulo,
                "data_memoria": data_memoria,
                "local": local or None,
                "descricao": descricao or None,
                "foto_url": foto_url,
            }).execute()
            return redirect(url_for("minhasMemorias_minhaGaleria"))
        except Exception:
            return render_template(
                "minhasMemorias_adicionarMemoria.html",
                erro="Erro ao salvar a memória. Tente novamente.",
                form=request.form,
            )

    return render_template("minhasMemorias_adicionarMemoria.html")


@app.route("/minhasMemorias/minhaGaleria")
@login_required
def minhasMemorias_minhaGaleria():
    filtro_titulo = (request.args.get("titulo") or "").strip()
    data_inicio = (request.args.get("data_inicio") or "").strip()
    data_fim = (request.args.get("data_fim") or "").strip()

    try:
        query = (
            supabase_admin.table("galeria_memorias")
            .select("id, titulo, data_memoria, local, descricao, foto_url, criado_em")
            .eq("user_id", session["user_id"])
        )
        if filtro_titulo:
            query = query.ilike("titulo", f"%{filtro_titulo}%")
        if data_inicio:
            query = query.gte("data_memoria", data_inicio)
        if data_fim:
            query = query.lte("data_memoria", data_fim)
        resultado = query.order("data_memoria", desc=True).execute()
        memorias = resultado.data or []
    except Exception:
        memorias = []

    for m in memorias:
        caminho = m.get("foto_url")
        if caminho:
            try:
                assinada = supabase_admin.storage.from_("memorias-fotos").create_signed_url(caminho, 3600)
                m["foto_signed_url"] = assinada.get("signedURL") or assinada.get("signed_url")
            except Exception:
                m["foto_signed_url"] = None
        else:
            m["foto_signed_url"] = None

        data_str = m.get("data_memoria") or ""
        try:
            dt = datetime.strptime(data_str[:10], "%Y-%m-%d")
            m["data_formatada"] = dt.strftime("%d/%m/%Y")
        except ValueError:
            m["data_formatada"] = data_str

    return render_template(
        "minhasMemorias_minhaGaleria.html",
        memorias=memorias,
        filtro_titulo=filtro_titulo,
        data_inicio=data_inicio,
        data_fim=data_fim,
    )


@app.route("/minhasMemorias/<memoria_id>/deletar", methods=["POST"])
@login_required
def minhasMemorias_deletar(memoria_id):
    try:
        resultado = (
            supabase_admin.table("galeria_memorias")
            .select("user_id, foto_url")
            .eq("id", memoria_id)
            .single()
            .execute()
        )
        memoria = resultado.data
    except Exception:
        return redirect(url_for("minhasMemorias_minhaGaleria"))

    if not memoria or memoria.get("user_id") != session.get("user_id"):
        return redirect(url_for("minhasMemorias_minhaGaleria"))

    caminho = memoria.get("foto_url")
    if caminho:
        try:
            supabase_admin.storage.from_("memorias-fotos").remove([caminho])
        except Exception:
            pass

    try:
        supabase_admin.table("galeria_memorias").delete().eq("id", memoria_id).execute()
    except Exception:
        pass

    return redirect(url_for("minhasMemorias_minhaGaleria"))

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
@login_required
def minhaJornadaIkigai():
        try:
            res = supabase_admin.table("ikigai_analises") \
                .select("id") \
                .eq("user_id", session["user_id"]) \
                .limit(1) \
                .execute()
            tem_analise = bool(res.data)
        except Exception:
            tem_analise = False
        return render_template("ikigaiPerguntas.html", tem_analise=tem_analise)

PROMPT_IKIGAI_BASE = """Você é um gerontólogo especializado em propósito de vida e bem-estar do idoso, com profundo conhecimento da filosofia japonesa do Ikigai. Você trabalha no projeto MemNikkei, voltado para idosos nipo-brasileiros.

## Base teórica (use para INFORMAR sua análise — NÃO cite na resposta)

Ikigai é a razão de viver, na interseção de quatro dimensões:
- **Paixão**: o que a pessoa ama fazer
- **Talento**: o que faz bem naturalmente
- **Missão**: o que o mundo precisa dela
- **Legado**: o valor duradouro que deixa

Conceitos que devem guiar sua leitura (sem aparecer no texto):
- Sentido de vida como força motivadora central
- Momentos de absorção completa em atividades significativas
- Comunidade e laços como fonte de propósito
- Maestria construída ao longo da vida
- Pertencimento e cuidado mútuo

## Como escrever a análise

**O que NÃO fazer:**
- NÃO abra a resposta com saudação ou introdução genérica ("Olá, é um prazer conversar...", "Analisando suas respostas, percebo..."). Comece direto pela seção 1.
- NÃO cite nomes de autores (Frankl, Csikszentmihalyi, etc.) nem termos estrangeiros (flow, takumi, moai, wabi-sabi, ichariba chode, logoterapia). A pessoa que vai ler é idosa e esses termos viram ruído.
- NÃO parafraseie as respostas com adjetivos. Se a pessoa disse "cozinho para a família", não escreva "você cozinha com amor para sua querida família" — isso é vazio.
- NÃO use linguagem teatral nem clichês de autoajuda. Banidos: "chama" (que alimenta, que arde, que continua acesa), "florescer/floresce", "monumento vivo", "farol", "luz que ilumina", "rastro de significado", "deliciosas tradições", "perpetuar a memória", "coração e mãos", "de coração em coração".
- NÃO seja bajulador genérico. Encorajamento vazio ("você é incrível") soa falso.
- NÃO concordar com algo fora da norma da sociedade humana.
- NÂO seja frio com as pessoas com condição mental pertubado.

**O que fazer:**
- IDENTIFIQUE o fio condutor que conecta as 8 respostas. O que elas, juntas, revelam sobre quem essa pessoa é? Que padrão aparece?
- ABRA cada seção JÁ com um insight ou observação nova — não com a paráfrase da resposta. O detalhe concreto (sushi, missoshiru, matsuri) entra para sustentar o insight, não como abertura.
- TRAGA pelo menos UM INSIGHT por seção — algo que a própria pessoa talvez não tenha percebido sobre si mesma ao responder.
- FALE COMO um neto sábio falaria com o avô que ama: com respeito, calor humano e honestidade — sem teatro.

## Se as respostas forem LIXO SINTÁTICO (e SOMENTE nesse caso)

O fallback abaixo só se aplica quando as respostas são objetivamente lixo sintático, sem conteúdo humano nenhum. Critério estrito:

- Sequências de números puras: "111", "222", "3333", "12345"
- Letras repetidas ou teclado batido: "aaaa", "asdf", "qwerty", "kkkkk"
- Caracteres aleatórios: "x", ".", "??"

Se a MAIORIA das 8 respostas se encaixa nessas categorias, responda APENAS com o seguinte texto, sem as 6 seções, sem qualquer outra coisa:

"Para que possamos preparar uma análise verdadeiramente significativa do seu Ikigai, precisamos conhecer um pouco mais sobre você. Por favor, refaça o questionário respondendo cada pergunta com calma, contando sobre as coisas que você gosta de fazer, as pessoas que você ama, as habilidades que você desenvolveu ao longo da vida e os valores que são importantes para você. Não há resposta certa ou errada — o que importa é que cada resposta venha do coração."

## O que NUNCA é lixo (sempre receba análise normal)

Respostas a seguir são VÁLIDAS e merecem análise completa e cuidadosa, mesmo quando curtas, negativas ou dolorosas:

- Respostas curtas mas reais: "cozinhar", "minha família", "ler"
- Respostas que expressam tristeza, vazio, depressão, solidão, desânimo, falta de sentido: "nada me alegra", "não sei", "estou cansado de viver", "nada", "ninguém precisa de mim", "perdi tudo"
- Respostas que mostram dúvida, confusão, ou que a pessoa "não tem talento" / "não contribui em nada"
- Respostas sobre perdas, luto, doença, isolamento

Esses casos NÃO são incoerência — são pedidos silenciosos de escuta, e exigem o cuidado mais profundo da sua resposta.

## Como responder quando as respostas mostram sofrimento emocional

Quando perceber sinais de depressão, desesperança, solidão profunda ou desejo de não viver, faça as 6 seções normalmente, mas:

- Acolha o que a pessoa disse com gentileza real, sem minimizar ("é só uma fase", "vai passar") nem teatralizar a dor.
- Procure no que ela disse pequenas brechas de vida — qualquer coisa concreta, mesmo pequena, que possa ser ponto de apoio (uma pessoa, uma lembrança, um gesto). Se não houver, seja honesto sobre isso em vez de inventar.
- No "Próximo passo", sugira algo MUITO pequeno e concreto (não "redescubra suas paixões"), e mencione com naturalidade a possibilidade de conversar com alguém de confiança — um familiar, médico, ou serviço de apoio como o CVV (188, ligação gratuita 24h). Não force, apenas ofereça como mais uma opção.
- Nunca diga que a pessoa "tem que" se sentir grata, "tem que" valorizar a vida, ou que "todo mundo passa por isso". Evite imperativos.

## Estrutura da resposta

Use exatamente estas 5 seções, e respeite o limite de tamanho:

1. **Sua Paixão** — máx. 2 parágrafos curtos
2. **Seu Talento** — máx. 2 parágrafos curtos
3. **Sua Missão** — máx. 2 parágrafos curtos
4. **Seu Legado** — máx. 2 parágrafos curtos
5. **Seu Ikigai** — síntese de 2 parágrafos identificando o ponto onde tudo se encontra
6. **Um próximo passo** — UMA sugestão concreta e simples de algo que a pessoa pode fazer no dia a dia ou na próxima semana para cultivar esse ikigai. Nada genérico ("continue compartilhando sua sabedoria"); algo prático ("convide um neto específico para uma tarde de cozinha por mês e peça que ele anote a receita à mão num caderno").

## Respostas do questionário:

{texto_respostas}"""

PERGUNTAS_IKIGAI = [
    "1) O que você faria de graça?",
    "2) O que você faz que te faz sentir mais vivo?",
    "3) O que você faz com facilidade?",
    "4) Em que os outros pedem a sua ajuda?",
    "5) Como você gostaria de contribuir com o mundo?",
    "6) Que mudança você gostaria de ver no mundo?",
    "7) Que habilidades suas são valorizadas?",
    "8) Quais delas poderiam gerar renda ou conhecimento?",
]

@app.route("/autoconhecimento/ikigai/minhasAnalises")
@login_required
def ikigai_minhas_analises():
    res = supabase_admin.table("ikigai_analises") \
        .select("id, analise, criado_em") \
        .eq("user_id", session["user_id"]) \
        .order("criado_em", desc=True) \
        .execute()
    analises = []
    for a in (res.data or []):
        try:
            dt = datetime.fromisoformat(a["criado_em"].replace("Z", "+00:00"))
            data_fmt = dt.strftime("%d/%m/%Y às %H:%M")
        except Exception:
            data_fmt = a["criado_em"]
        analises.append({"id": a["id"], "analise": a["analise"], "data_formatada": data_fmt})
    return render_template("ikigai_minhasAnalises.html", analises=analises)

@app.route("/autoconhecimento/ikigai/minhasAnalises/<id>/deletar", methods=["POST"])
@login_required
def ikigai_deletar_analise(id):
    try:
        res = supabase_admin.table("ikigai_analises").select("user_id").eq("id", id).execute()
        if res.data and res.data[0]["user_id"] == session["user_id"]:
            supabase_admin.table("ikigai_analises").delete().eq("id", id).execute()
    except Exception:
        pass
    return redirect(url_for("ikigai_minhas_analises"))

@app.route("/api/ikigai", methods=["POST"])
@login_required
def api_ikigai():
    payload = request.get_json(silent=True) or {}
    respostas = payload.get("respostas") or {}

    achatadas = {}
    for tema in ("paixao", "talento", "missao", "legado"):
        bloco = respostas.get(tema, {}) or {}
        for k, v in bloco.items():
            achatadas[int(k)] = (v or "").strip()

    linhas = []
    for i, pergunta in enumerate(PERGUNTAS_IKIGAI):
        linhas.append(f"{pergunta}\nResposta: {achatadas.get(i, '')}\n")
    texto_respostas = "\n".join(linhas)

    prompt = PROMPT_IKIGAI_BASE.format(texto_respostas=texto_respostas)

    gemini_key = os.getenv("GEMINI_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={gemini_key}"

    try:
        r = requests.post(url, json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.7, "maxOutputTokens": 4096}
        }, timeout=60)
        data = r.json()

        if r.status_code == 429 or (isinstance(data, dict) and data.get("error", {}).get("status") == "RESOURCE_EXHAUSTED"):
            return jsonify({
                "erro": "No momento, o limite gratuito diário de análises foi atingido. Por favor, tente novamente mais tarde ou amanhã. Pedimos desculpas pelo inconveniente.",
                "tipo": "quota_esgotada"
            }), 429

        if "candidates" not in data:
            return jsonify({"erro": "Falha ao gerar análise. Tente novamente."}), 502
        analise = data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        return jsonify({"erro": "Erro de conexão com o serviço de análise."}), 502

    try:
        supabase_admin.table("ikigai_analises").delete().eq("user_id", session["user_id"]).execute()
        supabase_admin.table("ikigai_analises").insert({
            "user_id": session["user_id"],
            "respostas": respostas,
            "analise": analise,
        }).execute()
    except Exception:
        pass

    return jsonify({"analise": analise})

##################################  JOGOS COGNITIVOS  ##############################
@app.route("/jogosCognitivos")
def jogosCognitivos():
        return render_template("jogosCognitivos_PaginaInicial.html")

@app.route("/jogosCognitivos/explicacaoTermo")
def explicacaoTermo():
        return render_template("explicacaoTermo.html")

@app.route("/jogosCognitivos/explicacaoTermo/termo")
def termo():
        return render_template("termo.html")

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

