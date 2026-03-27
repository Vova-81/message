const launchSocketConnChecks = (wss) => setInterval(() => {
  wss.clients.forEach((socket) => {
    if (!socket.isAlive) {
      socket.terminate();
      return;
    }

    socket.isAlive = false; // eslint-disable-line no-param-reassign
    try {
      socket.ping();
    } catch (err) {
      console.error(err);
    }
  });
}, 30000);

module.exports = launchSocketConnChecks;
