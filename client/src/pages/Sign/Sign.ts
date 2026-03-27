import Handlebars from 'handlebars';
import Block from '../../modules/block';
import getFormData from '../../utils/getFormData';
import sessionStorageAuth from '../../utils/sessionStorageAuth';
import {
  validateInput,
  removeError,
  makeError,
} from '../../utils/validation';
import { navigate } from '../../router/navigate';

import AuthAPI from '../../api/auth';

import template from './template';

const authApi = new AuthAPI();

interface Props extends PlainObject {
  form?: InstanceType<typeof Block>;
}

export default class SignPage extends Block {
  public props: Props;

  constructor(props?: Props) {
    super('div', props);
  }

  handleSubmitSignInForm() {
    const self = this;

    return async function (event: ClickEvent) { // eslint-disable-line func-names
      event.preventDefault();

      const data = getFormData('signInForm');

      if (data) {
        self.setProps({ isLoading: true });

        try {
          const response: any = await authApi.signin(data);

          sessionStorageAuth.login(response.data.accessToken, response.data.user.id);

          self.setProps({ isLoading: false });
          navigate('/chats');
        } catch (error) {
          console.error(error);

          self.setProps({ isLoading: false });

          const errorElem = document.querySelector('.signin-error span') as HTMLElement;
          if (errorElem) {
            removeError(errorElem);
            makeError(errorElem, error.message);
          }
        }
      }
    };
  }

  handleSubmitSignUpForm() {
    const self = this;

    return async function (event: ClickEvent) { // eslint-disable-line func-names
      event.preventDefault();
      const data = getFormData('signUpForm');

      if (data) {
        self.setProps({ isLoading: true });

        try {
          const response: any = await authApi.signup(data);

          sessionStorageAuth.login(response.data.accessToken, response.data.user.id);

          self.setProps({ isLoading: false });
          navigate('/chats');
        } catch (error) {
          console.error(error);

          self.setProps({ isLoading: false });

          const errorElem = document.querySelector('.signup-error span') as HTMLElement;
          if (errorElem) {
            removeError(errorElem);
            makeError(errorElem, error.message);
          }
        }
      }
    };
  }

  handleDemoLogin() {
    const self = this;

    return async function () { // eslint-disable-line func-names
      self.setProps({ isLoading: true });

      try {
        const response: any = await authApi.demo();

        sessionStorageAuth.login(response.data.accessToken, response.data.user.id);

        self.setProps({ isLoading: false });
        navigate('/chats');
      } catch (error) {
        console.error(error);

        self.setProps({ isLoading: false });

        const errorElem = document.querySelector('.signin-error span') as HTMLElement;
        if (errorElem) {
          removeError(errorElem);
          makeError(errorElem, error.message);
        }
      }
    };
  }

  addListeners() {
    this.getContent().querySelector('#signInForm')?.addEventListener('submit', this.handleSubmitSignInForm());
    this.getContent().querySelector('#signUpForm')?.addEventListener('submit', this.handleSubmitSignUpForm());
    this.getContent().querySelector('.demo-login-button')?.addEventListener('click', this.handleDemoLogin());

    this.getContent().querySelectorAll('input').forEach((element: HTMLInputElement) => {
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
  }

  componentDidRender() {
    this.addListeners();
  }

  render() {
    return Handlebars.compile(template)({
      form: this.props?.form?.render(),
      isLoading: this.props?.isLoading,
    });
  }
}
