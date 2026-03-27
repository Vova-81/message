import Handlebars from 'handlebars';
import Block from '../../modules/block';
import Button from '../Button';
import Form from '../Form';
import template from './template';

export default class ChatFeed extends Block {
  public props: Props;

  constructor(props?: Props) {
    super('div', props);
  }

  /* eslint-disable max-len */
  render() {
    return Handlebars.compile(template)({
      chatName: this.props?.chatName,
      avatarUrl: this.props?.chatAvatar,
      chatMembers: this.props?.chatMembers,
      chatType: this.props?.chatType,
      loggedUserId: sessionStorage.getItem('userId'),
      messages: this.props?.messages,
      loading: this.props?.loading,
      disabled: this.props?.disabled,

      chatMembersDropdownButton: new Button({
        className: 'button_additional dropdown-button',
        children: 'Chat members',
      }).render(),
      chatOptionsDropdownButton: new Button({
        className: 'dropdown-button',
        children: '<img src="static/assets/images/options-button.svg" alt="options" width="25" height="25" />',
      }).render(),
      addUserButton: new Button({
        className: 'button-with-image-and-text add-user-button',
        children: `
          <img src="static/assets/images/add-icon.svg" class="image-inside-button" alt="add user" width="22" height="22" />
          Add user
        `,
      }).render(),
      deleteUserButton: new Button({
        className: 'button-with-image-and-text delete-user-button',
        children: `
          <img src="static/assets/images/remove-icon.svg" class="image-inside-button" alt="remove user" width="22" height="22" />
          Remove user
        `,
      }).render(),
      resetPromptButton: new Button({
        id: 'resetPrompt',
        className: 'button-with-image-and-text reset-prompt-button',
        children: `
          <img src="static/assets/images/remove-icon.svg" class="image-inside-button" alt="reset context" width="22" height="22" />
          Reset context
        `,
      }).render(),
      deleteChatButton: new Button({
        className: 'button-with-image-and-text delete-chat-button',
        children: `
          <img src="static/assets/images/remove-icon.svg" class="image-inside-button" alt="remove user" width="22" height="22" />
          Delete chat
        `,
        disabled: true,
      }).render(),
      messageOptionsButton: new Button({
        disabled: this.props.disabled,
        className: 'dropdown-button',
        children: '<img src="static/assets/images/attachments.svg" alt="add attachments" width="32" height="32" />',
      }).render(),
      addMediaButton: new Button({
        className: 'button-with-image-and-text upload-media-button',
        children: `
          <img src="static/assets/images/media-icon.svg" class="image-inside-button" alt="add media" width="22" height="22" />
          Photo
        `,
      }).render(),
      addFileButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/file-icon.svg" class="image-inside-button" alt="add file" width="22" height="22" />
          File
        `,
        disabled: true,
      }).render(),
      addLocationButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/location-icon.svg" class="image-inside-button" alt="add location" width="22" height="22" />
          Location
        `,
        disabled: true,
      }).render(),
      newMessageForm: new Form({
        formId: 'messageForm',
        className: 'message-form',
        controlsWrapperClassName: 'flex-container',
        mainContent: `
          <textarea id="messageTextArea" class="message-textarea" ${this.props.disabled ? 'disabled' : ''} name="message" placeholder="Write a message..." required></textarea>
        `,
        buttonOk: new Button({
          disabled: this.props.disabled,
          children: '<img src="static/assets/images/send-message-icon.svg" alt="options" width="28" height="28" />',
          htmlType: 'submit',
        }).render(),
      }).render(),
    });
  }
}

interface Props extends PlainObject {
  chatId?: string;
}
