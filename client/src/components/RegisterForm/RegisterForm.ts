import Form from '../Form';
import Button from '../Button';
import template from './template';

const RegisterForm = new Form({
  formId: 'signUpForm',
  className: 'sign-form',
  mainContent: template,
  buttonOk: new Button({
    children: 'Sign up',
    className: 'button_main',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    onClick: 'navigate(\'/login\')',
    children: '<a class="button-link">Have an account?</a>',
    className: 'button_additional',
    htmlType: 'button',
  }).render(),
});

export default RegisterForm;
