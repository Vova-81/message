import HTTPTransport from './http-transport';

const sinon = require('sinon'); // eslint-disable-line @typescript-eslint/no-var-requires

const testAPIInstance = new HTTPTransport();

const server = sinon.fakeServer.create();

server.respondWith('POST', '/test', [
  200,
  { 'Content-Type': 'application/json' },
  '{ id: 0 }',
]);
server.autoRespond = true;

describe('test api calls', () => {
  test('it makes post request', async () => {
    const testData = { testData: 'testData' };

    const res: any = await testAPIInstance.post('/test', {
      data: testData,
      headers: { 'content-type': 'application/json' },
    });

    expect(res).toBeDefined();
    expect(res.status).toBe(200);
  });
});
