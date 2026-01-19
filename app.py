from flask import Flask, render_template


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("paginaInicial.html")

@app.route("/paginaInicial")
def paginaInicial():
    return render_template("paginaInicial.html")

#Relembrar Tradições
@app.route("/linhaDoTempo")
def linhaDoTempo():
        return render_template("linhaDoTempo.html")

#Páginas saúde Mental
@app.route("/saudeMental")
def saudeMental():
        return render_template("saudeMental.html")

@app.route("/saudeCerebral")
def saudeCerebral():
        return render_template("saudeMental_Cerebral.html")

@app.route("/saudeMental/saudeAlzheimer")
def saudeMental_Alzheimer():
        return render_template("saudeMental_Alzheimer.html")

# botoes pagina minhas memorias
@app.route("/minhasMemorias")
def minhasMemorias():
        return render_template("minhasMemorias.html")

@app.route("/minhasMemorias/adicionarMemoria")
def minhasMemorias_adicionarMemoria():
        return render_template("minhasMemorias_adicionarMemoria.html")

@app.route("/minhaGaleria")
def minhasMemorias_minhaGaleria():
        return render_template("minhasMemorias_minhaGaleria.html")

#Teste de template Universal no botão de Jogos cognitivos
@app.route("/jogosCognitivos")
def jogosCognitivos():
        return render_template("saudeMental_templateUniversal.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
