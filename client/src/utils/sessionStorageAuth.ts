import updateSessionStorageWithCustomEvent from './updateSessionStorageWithCustomEvent';

const sessionStorageAuth = {
  login: (token: string, userId: string) => {
    updateSessionStorageWithCustomEvent('set', [
      ['token', token],
      ['userId', userId],
    ]);
  },

  logout: () => {
    updateSessionStorageWithCustomEvent('clear');
  },
};

export default sessionStorageAuth;
