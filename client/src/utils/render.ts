export default function render(query: string, block: any): HTMLElement {
  const root: any = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());
  }
  return root;
}
