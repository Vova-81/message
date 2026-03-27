/* eslint-disable max-classes-per-file */
import Router from './Router';
import Block from '../modules/block';

class Test extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '<p>Test route Test</p>';
  }
}

class NotFound extends Block {
  constructor() {
    super('div');
  }

  render() {
    return '<p>Test route NotFound</p>';
  }
}

describe('test router', () => {
  const router = new Router('.app');

  beforeAll(() => {
    document.body.innerHTML = `
      <div class="app"></div>
    `;

    router
      .use('/test', Test, {}, false)
      .use('/404', NotFound, {}, false);
  });

  test('it provides correct route on url change', () => {
    window.history.pushState({}, '', '/test');
    router.start();

    expect(window.location.pathname).toContain('/test');
    expect(document.body.innerHTML).toContain('Test route Test');
  });

  test('falls to 404 page on incorrect path', () => {
    router.go('/not-exists');

    expect(window.location.pathname).toContain('/404');
    expect(document.body.innerHTML).toContain('Test route NotFound');
  });
});
