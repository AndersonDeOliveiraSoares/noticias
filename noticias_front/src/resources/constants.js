export const BASE_URL = 'http://127.0.0.1:8000'

export const API_URL = BASE_URL + '/api/v1/noticias';

export const USER_CREATE = '/api/auth/registeruser'
export const USER_LOGIN = '/api/auth/loginuser'

export const APP_LOGO = require('../assets/noticias_logo.png');
export const ALERT_OPTIONS = { autoClose: true, keepAfterRouteChange: true };

export const ROTA_HOME = '/home'
export const ROTA_CREATE = '/novo'
export const ROTA_LIST = '/list'
export const ROTA_EDIT = '/editar/:id'
export const ROTA_DELETE = '/apagar/:id'

export const ROTA_SIGN_IN = '/'
export const ROTA_SIGN_UP = '/signup'

export const ROTA_NOT_FOUND = '*'
