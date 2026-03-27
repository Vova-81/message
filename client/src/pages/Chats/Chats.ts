/* eslint-disable func-names */
import Handlebars from 'handlebars';
import Block from '../../modules/block';
import Chats from '../../components/Chats';
import ChatFeed from '../../components/ChatFeed';
import template from './template';

import handleModal from '../../utils/handleModals';
import getFormData from '../../utils/getFormData';

import {
  validateInput,
  removeError,
} from '../../utils/validation';

import {
  handleFileUpload,
  resetFileForm,
  submitFile,
} from '../../utils/handleFilesUpload';

import ChatsAPI from '../../api/chats';
import UsersAPI from '../../api/users';
import AuthAPI from '../../api/auth';
import WebSocketService from '../../modules/socket/socket-service';

import config from '../../config/config';

import {
  resetChatUnreadMsgsCount,
  rearrangeChatsList,
} from './helpers';

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();
const usersApi = new UsersAPI();

const socketHost = `${config.socketHost}/ws/chat`;

export default class ChatsPage extends Block {
  public props: Props;

  private _state: PlainObject;

  private _socket: WebSocketService | null;

  constructor(props?: Props) {
    super('div', props);

    this._state = {};
    this._socket = null;
  }

  componentDidRender() {
    this.addListeners();

    setTimeout(() => {
      const messageTextareaElem = this.getContent().querySelector('#messageTextArea') as HTMLTextAreaElement;
      messageTextareaElem?.focus();
    }, 100);
  }

  componentDidMount() {
    this.getChats();
    this.addSocketConnection();
    window.addEventListener('sessionStorageUpdate', this.onLoginLogout());
  }

  componentDidUpdate() {
    if (this._state.chatId !== this.props.chatId) {
      this._state.chatId = this.props.chatId;

      this.setProps({
        chatTitle: '',
        chatAvatar: null,
        messages: [],
      });

      if (this._state.chatId) {
        this.getChat();
        this._socket?.send({
          chatId: this._state.chatId,
          content: '0',
          type: 'get old',
        });
      }
    }

    return true;
  }

  // api calls
  async addSocketConnection() {
    const userResponse: any = await authApi.getUser();
    const userId = userResponse?.data?.id;

    if (userId) {
      const self = this;
      this._socket = new WebSocketService(socketHost);

      this._socket.subscribe('open', () => {
        self._socket?.send({
          chatId: self.props.chatId,
          content: '0',
          type: 'get old',
        });
      });

      this._socket.subscribe('message', (event: any) => {
        const dataRaw = event?.data;
        const data = JSON.parse(dataRaw);

        if (data && data.chatId === self.props.chatId) {
          if (data.type === 'old messages') {
            self.setProps({
              messages: data.data,
            });

            if (Array.isArray(data.data) && data.data.length > 0) {
              self._socket?.send({
                chatId: data.chatId,
                content: '0',
                type: 'read all',
              });

              if (self.props.chatsList) {
                resetChatUnreadMsgsCount(self, data.chatId);
              }
            }
          } else if (data.type === 'new message') {
            self._socket?.send({
              chatId: data.chatId,
              content: data.data.id,
              type: 'read',
            });

            // eslint-disable-next-line max-len
            const messagesToSet = Array.isArray(self.props.messages) ? [data.data, ...self.props.messages] : [data.data];
            self.setProps({
              messages: messagesToSet,
            });
          }

          if (data.pauseChat) {
            self.setProps({ messageInputDisabled: true });
          }

          if (data.continueChat || (self.props.messageInputDisabled && !data.pauseChat)) {
            self.setProps({ messageInputDisabled: false });
          }
        }

        if (data?.type === 'new message' && self.props.chatsList) {
          rearrangeChatsList(self, data);
        }
      });
    }

    this.setProps({ userId });
  }

  async getChats() {
    const response: any = await chatsApi.getChats();
    this.setProps({ chatsList: response.data || null });
  }

  async getChat() {
    const response: any = await chatsApi.getChat(this._state.chatId);

    this.setProps({
      chatTitle: response?.data?.name || 'Unknown',
      chatAvatar: response?.data?.avatar,
      chatType: response?.data?.type,
    });

    const chatUsers = response?.data?.users;

    if (Array.isArray(chatUsers)) {
      this.setProps({ chatMembers: chatUsers });
    }
  }
  //

  // modal handlers
  handleNewChatModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('create-chat-modal');
  }

  handleAddUserModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('add-user-modal');
  }

  handleDeleteUserModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('remove-user-modal');
  }

  handleDeleteChatModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('delete-chat-modal');
  }

  handleUploadImageModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('upload-image-to-chat-modal');
  }
  //

  // event handlers
  onLoginLogout() {
    const self = this;

    return async function () { // eslint-disable-line func-names
      const currentUserId = sessionStorage.getItem('userId');

      if (!currentUserId) {
        self.setProps({ chatsList: null });
        return;
      }

      self.getChats();
    };
  }

  handleCreateChat() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = getFormData('newChat');

      if (data) {
        try {
          const response: any = await chatsApi.createChat(data);
          if (response.status === 201) {
            self.getChats();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  }

  handleAddUser() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = getFormData('addUser');

      if (data && self.props.chatId) {
        try {
          const usersResponse: any = await usersApi.getUsersByLogin(data);
          if (usersResponse?.data && usersResponse.data[0]?.id) {
            await chatsApi.addUsers(self.props.chatId, [usersResponse.data[0].id]);
            self.getChat();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  }

  handleRemoveUser() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = getFormData('removeUser');

      if (data && self.props.chatId) {
        try {
          const users = self.props.chatMembers;
          if (users && users[0]) {
            const userToDelete = users.find((user: PlainObject) => user.username === data.username);
            if (userToDelete) {
              await chatsApi.deleteUsers(self.props.chatId, [userToDelete.id]);
              self.getChat();
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  }

  handleResetPrompt() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      if (self.props.chatId) {
        try {
          await chatsApi.resetPrompt(self.props.chatId);
        } catch (error) {
          console.error(error);
        }
      }
    };
  }

  handleSendMessage() {
    const self = this;

    return async function (event: ClickEvent | SubmitEvent) {
      event.preventDefault();
      const data = getFormData('messageForm');

      if (data?.message) {
        self._socket?.send({
          chatId: self.props.chatId,
          content: data.message,
          type: 'message',
        });
      }
    };
  }

  submitMessageOnEnter(event: KeyboardEvent) {
    const target = event.target as HTMLTextAreaElement;
    if (event.key === 'Enter' && !event.shiftKey && target.form) {
      target.form.dispatchEvent(new Event('submit', { cancelable: true }));
      event.preventDefault();
    }
  }

  handleUploadImage() {
    const self = this;

    return async function (event: ClickEvent) { // eslint-disable-line func-names
      event.preventDefault();
      const data = submitFile({
        inputId: 'message-file',
        modalId: 'upload-image-to-chat-modal',
        formId: 'message-image-form',
      });

      if (data) {
        self.setProps({ isLoading: true });

        try {
          const response: any = await chatsApi.uploadImage(self._state.chatId, data);

          self.setProps({ isLoading: false });

          if (response.status === 200) {
            self._socket?.send({
              chatId: self._state.chatId,
              content: response.data.url,
              contentType: 'image',
              type: 'message',
            });
            resetFileForm('upload-image-to-chat-modal', 'message-image-form');
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  }
  //

  addListeners() {
    this.getContent().querySelector('.create-chat')?.addEventListener('click', this.handleNewChatModal);
    this.getContent().querySelector('.add-user-button')?.addEventListener('click', this.handleAddUserModal);
    this.getContent().querySelector('.delete-user-button')?.addEventListener('click', this.handleDeleteUserModal);
    this.getContent().querySelector('.delete-chat-button')?.addEventListener('click', this.handleDeleteChatModal);
    this.getContent().querySelector('.upload-media-button')?.addEventListener('click', this.handleUploadImageModal);
    this.getContent().querySelector('#messageTextArea')?.addEventListener('keypress', this.submitMessageOnEnter);

    this.getContent().querySelectorAll('.modal-wrapper input').forEach((element: HTMLInputElement) => {
      element.addEventListener('focus', () => {
        removeError(element);
      });
      element.addEventListener('blur', () => {
        try {
          validateInput(element);
        } catch (err) {
          console.error(err);
        }
      });
    });

    this.getContent().querySelector('#newChat')?.addEventListener('submit', this.handleCreateChat());
    this.getContent().querySelector('#addUser')?.addEventListener('submit', this.handleAddUser());
    this.getContent().querySelector('#removeUser')?.addEventListener('submit', this.handleRemoveUser());
    this.getContent().querySelector('#messageForm')?.addEventListener('submit', this.handleSendMessage());
    this.getContent().querySelector('#resetPrompt')?.addEventListener('click', this.handleResetPrompt());

    // eslint-disable-next-line max-len
    this.getContent().querySelector('#message-file')?.addEventListener('change', handleFileUpload('upload-image-to-chat-modal', 'message-file'));
    this.getContent().querySelector('#message-image-form')?.addEventListener('submit', this.handleUploadImage());
  }

  render() {
    return Handlebars.compile(template)({
      selectedChatId: this.props.chatId,
      chats: new Chats({
        chatsList: this.props.chatsList,
        selectedChatId: this.props.chatId,
      }).render(),
      feed: new ChatFeed({
        chatId: this.props.chatId,
        chatName: this.props.chatTitle,
        chatAvatar: this.props.chatAvatar,
        chatMembers: this.props.chatMembers,
        chatType: this.props.chatType,
        messages: this.props.messages,
        disabled: this.props.messageInputDisabled,
        loading: this.props.isLoading,
      }).render(),
    });
  }
}

interface Props extends PlainObject {
  chatId?: string;
  chatsList?: ChatObject[];
}
