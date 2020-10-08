from flask import Flask
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_restful import Api
from config.config import *
from api.urls import initialize_url
from database.db import initialize_db
from resources.errors import errors
from resources.utils import str_to_bool
from flask_cors import CORS
from flask_jwt_extended import JWTManager

import os


def create_app():
    app = Flask(__name__)

    # Configura acesso ao banco de dados
    app = config_db(app)

    # Inicializa Banco de Dados
    initialize_db(app)

    # Definition of the routes
    api = Api(app, errors=errors)
    initialize_url(api)

    # Configura parametros de autenticacao
    app = config_auth(app)

    # Hashing lib
    bcrypt = Bcrypt(app)

    # Controle de autenticacao
    jwt = JWTManager(app)



    # Set CORS
    CORS(app)

    return app


if __name__ == "__main__":
    # Load .env
    load_dotenv()
    # Load vars
    port = os.getenv("PORT")
    debug = str_to_bool(os.getenv("DEBUG"))
    # Inicializa api
    app = create_app()
    # Executa a aplicacao
    app.run(host="0.0.0.0", port=port, debug=debug)
