from resources.utils import validate_date, adjust_dict_news, adjust_news
from flask import Response, request
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, \
    DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, InternalServerError, \
    NewsAlreadyExistsError, UpdatingNewsError, DeletingNewsError, NewsNotExistsError
from flask_jwt_extended import jwt_required
from database.models import Noticia
from flask_restful import Resource

import json


class NoticiaApi(Resource):
    # Recupera Lista de Noticias
    @jwt_required
    def get(self):
        try:
            list_noticia_doc = Noticia.objects.all().to_json()
            list_noticia_dict = json.loads(list_noticia_doc)
            list_noticia = json.dumps(adjust_dict_news(list_noticia_dict))
            return Response(list_noticia, mimetype="application/json", status=200)
        except Exception as e:
            raise InternalServerError

    @jwt_required
    def post(self):
        try:
            body = request.get_json()
            body['data_publicacao'] = validate_date(body['data_publicacao'])
            noticia = Noticia(**body).save()
            return {'id': str(noticia.id)}, 200
        except (FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except NotUniqueError:
            raise NewsAlreadyExistsError
        except Exception:
            raise InternalServerError


class NoticiaParamApi(Resource):
    # Altera conteudo de uma noticia
    @jwt_required
    def put(self, id_noticia):
        try:
            body = request.get_json()
            body['data_publicacao'] = validate_date(body['data_publicacao'])
            novo_id = Noticia.objects.get(id=id_noticia).update(**body)
            return {'id': novo_id}, 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingNewsError
        except Exception:
            raise InternalServerError

    # Exclui noticia
    @jwt_required
    def delete(self, id_noticia):
        try:
            Noticia.objects.get(id=id_noticia).delete()
            return '', 200
        except DoesNotExist:
            raise DeletingNewsError
        except Exception:
            raise InternalServerError

    # Busca Noticia por ID
    @jwt_required
    def get(self, id_noticia):
        try:
            noticia_doc = Noticia.objects.get(id=id_noticia).to_json()
            noticia_obj = json.loads(noticia_doc)
            noticia = json.dumps(adjust_news(noticia_obj))
            return Response(noticia, mimetype="application/json", status=200)
        except DoesNotExist:
            raise NewsNotExistsError
        except Exception:
            raise InternalServerError
