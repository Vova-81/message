import Form from '../Form';
import Button from '../Button';
import template from './template';

const LoginForm = new Form({
  formId: 'signInForm',
  className: 'sign-form',
  mainContent: template,
  buttonOk: new Button({
    children: 'Sign in',
    className: 'button_main',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    onClick: 'navigate(\'/signup\')',
    children: '<a class="button-link">Don&#39;t have an account?</a>',
    className: 'button_additional',
    htmlType: 'button',
  }).render(),
  buttonOkExtra: new Button({
    children: 'Demo login',
    className: 'button_main demo-login-button',
    htmlType: 'button',
  }).render(),
});

export default LoginForm;
