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
        return render_template("relembrarTradicoes.html")
@app.route("/linhaDoTempo")
def linhaDoTempo():
        return render_template("linhaDoTempo.html")

##################################  MURAL DE HISTÓRIAS  ##############################
@app.route("/muralDeHistorias")
def muralDeHistorias():
        return render_template("muralDeHistorias.html")
##################################  MINHAS MEMÓRIASS  ##############################
@app.route("/minhasMemorias")
def minhasMemorias():
        return render_template("minhasMemorias.html")

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

##################################  SAÚDE MENTAL  ##############################
@app.route("/saudeMental")
def saudeMental():
        return render_template("saudeMental.html")

@app.route("/saudeMental/saudeCerebral")
def saudeCerebral():
        return render_template("saudeMental_templateUniversal.html",pagina = "saudeCerebral")

@app.route("/saudeMental/saudeAlzheimer")
def saudeMental_Alzheimer():
        return render_template("saudeMental_Alzheimer.html")

@app.route("/saudeMental/saudeSolidao")
def saudeMental_Solidao():
        return render_template("saudeMental_templateUniversal.html", pagina = "solidao")

#Teste de template Universal no botão de Jogos cognitivos
@app.route("/jogosCognitivos")
def jogosCognitivos():
        return render_template("saudeMental_templateUniversal.html",pagina = "solidao")

#rota solidao/ansiedade/depressão -> saudementaltemplateuniversal

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
