from flask import Flask, render_template


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("paginaInicial.html")

@app.route("/paginaInicial")
def paginaInicial():
    return render_template("paginaInicial.html")

@app.route("/saudeCerebral")
def saudeCerebral():
        return render_template("saudeMental_Cerebral.html")

@app.route("/saudeMental")
def saudeMental():
        return render_template("saudeMental.html")

@app.route("/saudeAlzheimer")
def saudeMental_Alzheimer():
        return render_template("saudeMental_Alzheimer.html")

# botoes pagina minhas memorias

@app.route("/adicionarMemoria")
def Adicionar_Memoria():
        return render_template("adicionarMemoria.html")

@app.route("/linhaDoTempo")
def Linha_Do_Tempo():
        return render_template("linhaDoTempo.html")

@app.route("/minhaGaleria")
def Minha_Galeria():
        return render_template("minhaGaleria.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
