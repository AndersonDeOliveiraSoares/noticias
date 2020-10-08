import os


def config_db(app):
    app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb://' + os.getenv('DB_HOST') + ':' +
                os.getenv('DB_PORT') + '/' +
                os.getenv('DB_NAME')
    }

    return app


def config_auth(app):
    app.JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    app.secret_key = os.getenv('SECRET_KEY')

    return app
