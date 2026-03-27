/**
 * Управление кнопками для изменений в профиле
*/
export function onChangeDetailsClick(event: ClickEvent): void {
  event.preventDefault();
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');

  const inputs: HTMLCollectionOf<HTMLInputElement> = detailsForm.getElementsByTagName('input');

  for (const input of inputs as any) { // eslint-disable-line no-restricted-syntax
    input.disabled = false;
  }

  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];
  controlButtons.hidden = true;

  const formButtons = <HTMLElement> document.getElementsByClassName('profile-data__form-controls')[0];
  formButtons.hidden = false;
}

export function cancelDetailsChange(event: ClickEvent): void {
  event.preventDefault();
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');

  detailsForm.reset();

  const inputs: HTMLCollectionOf<HTMLInputElement> = detailsForm.getElementsByTagName('input');

  for (const input of inputs as any) { // eslint-disable-line no-restricted-syntax
    input.disabled = true;
  }

  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];
  controlButtons.hidden = false;

  const formButtons = <HTMLElement> document.getElementsByClassName('profile-data__form-controls')[0];
  formButtons.hidden = true;

  const errors: NodeListOf<Element> = detailsForm.querySelectorAll('.input-error-message');
  for (let i = 0; i < errors.length; i += 1) {
    errors[i].remove();
  }
}

export function onChangePasswordClick(event: ClickEvent): void {
  event.preventDefault();
  const passwordForm = <HTMLFormElement> document.getElementById('userPassword');
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');
  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];

  detailsForm.hidden = true;
  passwordForm.hidden = false;
  controlButtons.hidden = true;
}

export function cancelPasswordChange(event: ClickEvent) {
  event.preventDefault();
  const passwordForm = <HTMLFormElement> document.getElementById('userPassword');
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');
  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];

  passwordForm.reset();
  passwordForm.hidden = true;
  detailsForm.hidden = false;
  controlButtons.hidden = false;

  const errors: NodeListOf<Element> = passwordForm.querySelectorAll('.input-error-message');
  for (let i = 0; i < errors.length; i += 1) {
    errors[i].remove();
  }
}
