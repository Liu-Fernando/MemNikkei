from flask import Flask, render_template


app = Flask(__name__)

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


################ MÚSICAS SONS E DANÇAS ######################

@app.route("/relembrarTradicoes/objetosCotidianos")
def objetosCotidianos():
        return render_template("RelembrarTradicoes/ObjetosCotidianos/objetosCotidianos.html")

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

