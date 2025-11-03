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
        return render_template("saudeCerebral.html")

@app.route("/saudeMental")
def saudeMental():
        return render_template("saudeMental.html")

if __name__ == "__main__":
    app.run(debug=True)
