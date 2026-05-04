from flask import Flask, render_template,request, jsonify
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime
from io import BufferedReader
from flask import send_from_directory


load_dotenv()


app = Flask(__name__)

#########################################SUPABASE####################################
supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_PUBLISHABLE_KEY")
)
#Listar todas memórias
@app.route("/minhasMemorias/adicionarMemoria/listaDeMemorias", methods=["GET"])
def get_memorias():
    rows = supabase.table("memorias").select("*").order("id").execute()

    return jsonify(rows.data if hasattr(rows, "data") else rows)
#Adiciona memoria
@app.route("/minhasMemorias/adicionarMemoria", methods =["POST"])
def add_memoria():
        #adicionar checagens para erros, colocar requisição do JS para fazer essa checagem
        #Recebe dados de input diretamente de adcionarMemorias.html
        titulo= request.form['tituloMemoria']
        data = request.form['dataMemoria']
        local= request.form['localMemoria']
        descricao= request.form['descricao']
        arquivo=request.files['selecionarArquivos']
        #Cria um nome único para ser armazenado no bucket
        filePath= arquivo.filename + str(datetime.now())
        #Transforma em Buffered para solucionar problema com FileStorage object que não é aceito pelo upload do supabase
        file_arquivo = BufferedReader(arquivo)
        #Havia tido um erro que não consegui replicar com filePath
        supabase.storage.from_("arquivo_memorias").upload(path=filePath,file= file_arquivo)
        arquivo_url= supabase.storage.from_("arquivo_memorias").get_public_url(filePath)
        new_row = {
                "titulo": titulo,
                "data": data,
                "local": local,
                "descricao":descricao,
                "arquivo": arquivo_url
        }
        supabase.table("memorias").insert(new_row).execute()
        return render_template("minhasMemorias_adicionarMemoria.html")
        
@app.route("/minhasMemorias/minhaGaleria/<int:memoria_id>", methods =["DELETE"])
def delete_memoria(memoria_id):
        res= supabase.table("memorias").delete().eq("id",memoria_id).execute()
        return render_template("minhasMemorias_minhaGaleria.html")

@app.route("/")
def home():
    return render_template("paginaInicial.html")

@app.route("/paginaInicial")
def paginaInicial():
    return render_template("paginaInicial.html")

@app.route('/favicon.ico')
def favicon():
      return send_from_directory(app.static_folder, 'favicon.ico')

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

##################################  MURAL DE HISTÓRIAS  ##############################
@app.route("/muralDeHistorias")
def muralDeHistorias():
        return render_template("muralDeHistorias.html")

##################################  MINHAS MEMÓRIASS  ##############################
@app.route("/minhasMemorias")
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

@app.route("/autoconhecimento/minhaJornada")
def minha_Jornada():
        return render_template("minhaJornada.html")

@app.route("/autoconhecimento/ikigai")
def ikigai():
        return render_template("ikigai.html")

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

