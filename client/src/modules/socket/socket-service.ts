import ReconnectingWebSocket from 'reconnecting-websocket';

class WebSocketService {
  private socket: ReconnectingWebSocket;
  private chatId: string = '';

  constructor(baseUrl: string) {
    const token = sessionStorage.getItem('token') || '';
    this.socket = new ReconnectingWebSocket(`${baseUrl}?token=${token}`);
  }

  subscribe(eventType: string, callback: (event: MessageEvent) => void): void {
    // Используем any для обхода проблемы с типами
    (this.socket as any).addEventListener(eventType, callback);
  }

  send(data: any): void {
    this.socket.send(JSON.stringify(data));
  }

  close(): void {
    this.socket.close();
  }
}

export default WebSocketService;