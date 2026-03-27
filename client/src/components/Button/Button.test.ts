import Button from './Button';

describe('Button component', () => {
  global.Handlebars = require('handlebars'); // eslint-disable-line global-require
  const button = new Button({ children: 'Test content' });

  test('it creates button element', () => {
    expect(button.getContent().innerHTML).toContain('<button');
  });

  test('it puts correct content inside button', () => {
    expect(button.getContent().innerHTML).toContain('Test content');
  });
});
