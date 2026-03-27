import Handlebars from 'handlebars';
import Block from '../../modules/block';
import Button from '../../components/Button';

import template from './template';

export default class NotFoundError extends Block {
  constructor() {
    super('div');
  }

  render() {
    return Handlebars.compile(template)({
      button: new Button({
        className: 'button_additional',
        children: '<a class="button-link">Back to chats</a>',
        onClick: 'navigate(\'/chats\')',
      }).render(),
    });
  }
}
