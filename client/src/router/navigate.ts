function navigate(path: string): void {
  if (path === window.location.pathname) {
    return;
  }
  const pushStateEvent = new CustomEvent('_pushstate', { detail: path });
  window.dispatchEvent(pushStateEvent);
}

export { navigate };
(window as any).navigate = navigate;