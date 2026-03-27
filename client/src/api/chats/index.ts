import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http';
import config from '../../config/config';

const chatsAPIInstance = new HTTPTransport(`${config.serverHost}/api/chats`);

export default class ChatsAPI extends BaseAPI {
  getChats() {
    return chatsAPIInstance.get('/', {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  createChat(data: PlainObject) {
    return chatsAPIInstance.post('/', {
      data,
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  getChat(chatId: number | string) {
    return chatsAPIInstance.get(`/${chatId}`, {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  addUsers(chatId: number | string, users: [string]) {
    return chatsAPIInstance.put(`/${chatId}/users`, {
      data: { users },
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  deleteUsers(chatId: number | string, users: [string]) {
    return chatsAPIInstance.delete(`/${chatId}/users`, {
      data: { users },
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  getChatUsers(chatId: number | string) {
    return chatsAPIInstance.get(`/${chatId}/users`, {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  getChatToken(chatId: number | string) {
    return chatsAPIInstance.post(`/token/${chatId}`, {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  uploadImage(chatId: number | string, data: FormData) {
    return chatsAPIInstance.put(`/${chatId}/images`, {
      data: {},
      file: data,
      headers: { authorization: this.token() },
    });
  }

  resetPrompt(chatId: number | string) {
    return chatsAPIInstance.delete(`/${chatId}/prompt`, {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }
}
