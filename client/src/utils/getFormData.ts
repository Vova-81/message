import { validateInput } from './validation';

/**
 * Отправка формы
 */
export default function getFormData(formId: string): PlainObject | undefined {
  const form: any = document.getElementById(formId);

  let hasError = false;

  form.querySelectorAll('input').forEach((element: HTMLInputElement) => {
    try {
      validateInput(element);
    } catch {
      hasError = true;
    }
  });

  if (hasError) {
    return undefined;
  }

  const formData: any = new FormData(form);
  const formFields: PlainObject = {};

  for (const [key, value] of formData) { // eslint-disable-line no-restricted-syntax
    formFields[key] = value;
  }

  form.reset();
  return formFields;
}
