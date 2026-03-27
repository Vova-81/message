import Handlebars from 'handlebars';
import Block from '../../modules/block';
import Button from '../Button';
import template from './template';

interface Props extends PlainObject {
  chatsList?: ChatObject[];
}

export default class Chats extends Block {
  public props: Props;

  constructor(props?: Props) {
    super('div', props);
  }

  render() {
    return Handlebars.compile(template)({
      chatsList: this.props?.chatsList,
      selectedChatId: this.props?.selectedChatId,
      loggedUserId: sessionStorage.getItem('userId'),
      createChatButton: new Button({
        className: 'button_additional create-chat',
        children: 'New chat',
        htmlType: 'button',
      }).render(),
      profileButton: new Button({
        className: 'profile-button',
        onClick: 'navigate(\'/profile\')',
        children: `
          <div class="button-inner-container">
            <a class="button-link">View profile</a>
            <img src="static/assets/images/arrow-right.svg" alt="arrow right" class="button-arrow-right-image" />
          </div>
        `,
      }).render(),
    });
  }
}
