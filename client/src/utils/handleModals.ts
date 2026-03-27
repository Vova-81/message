/**
 * Управление модальным окном
 * @param {string} modalId
 */
export default function handleModal(modalId: string): void {
  const modal = <HTMLElement> document.getElementById(modalId);

  modal.style.display = 'flex';

  const modalBody = <HTMLElement> document.querySelector(`#${modalId} .modal-body`);

  const listener = (event: { target: Node; } | any): void => {
    const isClickInside: boolean = modalBody.contains(event.target);

    if (!isClickInside) {
      modal.style.display = 'none';
      document.removeEventListener('click', listener);
    }
  };

  setTimeout(() => {
    document.addEventListener('click', listener);
  }, 200);
}
