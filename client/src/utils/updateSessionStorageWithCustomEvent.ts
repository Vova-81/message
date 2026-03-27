type SessionStorageUpdateType = 'set' | 'remove' | 'clear';
type SessionStorageUpdatePayload = Array<[string, string]>;
/**
  * Updates sessionStorage and dispathes custom 'sessionStorageUpdate' event
 */
const updateSessionStorageWithCustomEvent = (
  updateType: SessionStorageUpdateType,
  payload?: SessionStorageUpdatePayload,
) => {
  if (updateType === 'clear') {
    sessionStorage.clear();
  } else {
    if (!payload) {
      return;
    }

    payload.forEach(([key, value]) => {
      if (updateType === 'set' && value) {
        sessionStorage.setItem(key, value);
      }
      if (updateType === 'remove') {
        sessionStorage.removeItem(key);
      }
    });
  }

  const event = new Event('sessionStorageUpdate');
  window.dispatchEvent(event);
};

export default updateSessionStorageWithCustomEvent;
