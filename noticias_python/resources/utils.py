from datetime import datetime

import pytz


# Converte string em boolean
def str_to_bool(strbool):
    if strbool.lower() == 'true':
        return True
    elif strbool.lower() == 'false':
        return False
    else:
        raise ValueError


#  valida e converte testo "Y-M-d" em objeto data (timezone SP/Brazil)
def validate_date(date_text):
    timezone = pytz.timezone('America/Sao_Paulo')
    try:
        dt = timezone.localize(datetime.strptime(date_text + ' 00:00:00', '%Y-%m-%d %H:%M:%S'))
        return dt
    except ValueError:
        dt = timezone.localize(datetime.today())
        return dt


# Converte  timestamp value em string (Year-Month-Day)
def timestamp_to_formated_date(dt):
    return datetime.fromtimestamp(int(dt)/1000).strftime('%Y-%m-%d')


# Converte MongoDB em objeto Noticia
def adjust_news(noticia):
    return {
        'id': noticia['_id']['$oid'],
        'titulo': noticia['titulo'],
        'conteudo': noticia['conteudo'],
        'data_publicacao': timestamp_to_formated_date(noticia['data_publicacao']['$date'])}


# Converte lista de MongoDB em lista de objeto Noticia
def adjust_dict_news(list_bson):
    list_news = []

    for item in list_bson:
        elem = adjust_news(item)
        list_news.append(elem)

    return list_news


def create_now():
    timezone = pytz.timezone('America/Sao_Paulo')
    today_tz = datetime.now(tz=timezone)
    return today_tz
