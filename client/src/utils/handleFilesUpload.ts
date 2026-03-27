export const handleFileUpload = (modalId: string, inputId: string) => (event: ClickEvent): void => {
  event.preventDefault();

  const fileInput = <HTMLInputElement> document.getElementById(inputId);
  const errorMsg = <HTMLElement> document.querySelector(`#${modalId} .modal-body__error-msg`);

  const files = <FileList> fileInput.files;

  if (files.length === 0) {
    errorMsg.style.display = 'block';
  } else {
    errorMsg.style.display = 'none';
    const fileNameElement = <HTMLElement> document.querySelector(`#${modalId} .file-name`);
    fileNameElement.innerText = files[0].name;

    const uploadControl = <HTMLElement> document.querySelector(`#${modalId} .upload-control`);
    uploadControl.hidden = true;
  }
};

export function resetFileForm(modalId: string, formId: string): void {
  const fileForm = <HTMLFormElement> document.getElementById(formId);
  fileForm.reset();

  const errorMsg = <HTMLElement> document.querySelector(`#${modalId} .modal-body__error-msg`);
  errorMsg.style.display = 'none';

  const fileNameElement = <HTMLElement> document.querySelector(`#${modalId} .file-name`);
  fileNameElement.innerText = '';

  const uploadControl = <HTMLElement> document.querySelector(`#${modalId} .upload-control`);
  uploadControl.hidden = false;
}

type FileModalData = {
  inputId: string;
  modalId: string;
  formId: string;
};

export function submitFile(modalData: FileModalData): FormData | undefined {
  const fileInput = <HTMLInputElement> document.getElementById(modalData.inputId);
  const modal = <HTMLElement> document.getElementById(modalData.modalId);

  const files = <FileList> fileInput.files;

  const fileForm = <HTMLFormElement> document.getElementById(modalData.formId);
  const data = new FormData(fileForm);

  if (files.length === 0) {
    const errorMsg = <HTMLElement> document.querySelector(`#${modalData.modalId} .modal-body__error-msg`);
    errorMsg.style.display = 'block';
    return undefined;
  }

  modal.style.display = 'none';
  return data;
}
