from flask_bcrypt import generate_password_hash, check_password_hash
from .db import db


class Noticia(db.Document):
    titulo = db.StringField(required=True)
    conteudo = db.StringField(required=True)
    data_publicacao = db.DateTimeField(required=True)


class Usuario(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=8)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)
