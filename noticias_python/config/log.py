from logging.handlers import TimedRotatingFileHandler

import logging
import os


PATH_LOG = 'log/'
FILE_LOG = 'noticias.log'

if not os.path.isdir(PATH_LOG):
    os.mkdir(PATH_LOG)

formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s %(message)s')
handler = TimedRotatingFileHandler(PATH_LOG + FILE_LOG, when="midnight", interval=1, encoding='utf8')
handler.suffix = "%Y-%m-%d"
handler.setFormatter(formatter)
logger = logging.getLogger('<NOTICIAS_APP>')
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)
