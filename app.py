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

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
