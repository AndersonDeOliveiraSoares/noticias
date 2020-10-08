from resources.errors import SchemaValidationError, EmailAlreadyExistsError, \
    UnauthorizedError, InternalServerError
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from flask import request
from database.models import Usuario as ModelUsuario
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist


import datetime


class LoginUser(Resource):
    def post(self):
        try:
            body = request.get_json()
            user = ModelUsuario.objects.get(email=body.get('email'))
            authorized = user.check_password(body.get('password'))
            if not authorized:
                return {'error': 'Email or password invalid'}, 401

            expires = datetime.timedelta(days=7)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {'token': access_token}, 200
        except (UnauthorizedError, DoesNotExist):
            raise UnauthorizedError
        except Exception as e:
            raise InternalServerError


class RegisterUser(Resource):
    def post(self):
        try:
            body = request.get_json()
            user = ModelUsuario(**body)
            user.hash_password()
            user.save()
            id_user = user.id
            return {'id': str(id_user)}, 200
        except FieldDoesNotExist:
            raise SchemaValidationError
        except NotUniqueError:
            raise EmailAlreadyExistsError
        except Exception as e:
            raise InternalServerError