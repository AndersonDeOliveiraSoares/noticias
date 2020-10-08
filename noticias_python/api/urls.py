from api.noticia import NoticiaApi, NoticiaParamApi
from api.auth import RegisterUser, LoginUser


def initialize_url(api):
    api.add_resource(NoticiaApi, '/api/v1/noticias')
    api.add_resource(NoticiaParamApi, '/api/v1/noticias/<id_noticia>')
    api.add_resource(RegisterUser, '/api/auth/registeruser')
    api.add_resource(LoginUser, '/api/auth/loginuser')