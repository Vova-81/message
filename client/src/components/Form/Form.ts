import Handlebars from 'handlebars';

import Block from '../../modules/block';
import template from './template';

export default class Form extends Block {
  public props: Record<string, any>;

  constructor(props: Record<string, any>) {
    super('div', props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
