import { environment } from '../../../environments/environment';

const api = {
    prod: '',
    dev: 'http://localhost:3000/api',
    localhost: 'http://localhost:3000/api'
}

var env = 'dev';
if (environment.production) {
    env = 'prod'
}

export const APP_CONFIG = {
    api: api[env],
    appTitle: 'vodApp',
    storage: 'localStorage',
    jwtKey: 'jwtToken',
}