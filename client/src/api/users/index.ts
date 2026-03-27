import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http';
import config from '../../config/config';

const usersAPIInstance = new HTTPTransport(`${config.serverHost}/api/user`);

export default class UsersAPI extends BaseAPI {
  changeProfile(data: PlainObject) {
    return usersAPIInstance.put('/profile', {
      data,
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  changeAvatar(data: FormData) {
    return usersAPIInstance.put('/avatar', {
      data: {},
      file: data,
      headers: { authorization: this.token() },
    });
  }

  changePassword(data: PlainObject) {
    return usersAPIInstance.put('/password', {
      data,
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  getUsersByLogin(data: PlainObject) {
    return usersAPIInstance.post('/search', {
      data,
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }
}
