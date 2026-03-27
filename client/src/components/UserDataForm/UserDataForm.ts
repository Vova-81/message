import Handlebars from 'handlebars';
import Form from '../Form';
import Button from '../Button';
import template from './template';

const UserDataForm = (userData: Record<string, any> = {}) => new Form({
  formId: 'userDetails',
  className: 'profile-data__form',
  controlsWrapperClassName: 'profile-data__form-controls',
  isControlsHidden: true,
  mainContent: Handlebars.compile(template)(userData),
  buttonOk: new Button({
    children: 'Save',
    className: 'button_main',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    children: 'Cancel',
    className: 'button_additional cancel-details-change-button',
    htmlType: 'button',
  }).render(),
});

export default UserDataForm;
