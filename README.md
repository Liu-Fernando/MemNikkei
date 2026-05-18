Informações sobre projeto

components - Pasta com código js para carregar os diferentes templates
templates - todos HTML

//Instruções para rodar o código
Python 3.10 - Flask
Clonar repositório
Criar ambiente virtual 
$ python -m venv /caminho/para/novo/ambiente/virtual
ex: python -m venv C:\Users\Fernando Liu\Desktop\Programas\VSCode\MemNikkey\app.py
Ativar ambiente virtual
$ .\venv\Scripts\activate
$ pip install -r "requirements.txt"
$ python app.py

//Instruções sobre python anywhere
Abrir bash, $git clone https://github.com/Liu-Fernando/MemNikkei
Configurar ambiente virtual $mkvirtualenv my-venv --python=python3.10
Instalar requisitos $pip install -r requirements.txt
Configurar WSGI [Colocar home correto e from app tem que ser condizente com código]
# This file contains the WSGI configuration required to serve up your
# web application at http://<your-username>.pythonanywhere.com/
# It works by setting the variable 'application' to a WSGI handler of some
# description.
#
# The below has been auto-generated for your Flask project

import sys

# add your project directory to the sys.path
project_home = '/home/MemoriasNikkei/MemNikkei'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# import flask app but need to call it "application" for WSGI to work
from app import app as application  # noqa

Configurar Source code e Working Directory e WSGI configuration [Colocar os diretórios corretos]
/home/MemoriasNikkei/MemNikkei
/home/MemoriasNikkei/
/var/www/memoriasnikkei_pythonanywhere_com_wsgi.py

Para atualizar versão
$ cd MemNikkey
$ git pull
Reload fernandoliu.pythonanywhere.com

