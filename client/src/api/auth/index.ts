import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http';
import config from '../../config/config';

const authAPIInstance = new HTTPTransport(`${config.serverHost}/auth`);

export default class AuthAPI extends BaseAPI {
  signup(data: PlainObject) {
    return authAPIInstance.post('/signup', {
      data,
      headers: { 'content-type': 'application/json' },
    });
  }

  signin(data: PlainObject) {
    return authAPIInstance.post('/signin', {
      data,
      headers: { 'content-type': 'application/json' },
    });
  }

  getUser() {
    return authAPIInstance.get('/user', {
      headers: { authorization: this.token() },
    });
  }

  demo() {
    return authAPIInstance.post('/demo');
  }
}
