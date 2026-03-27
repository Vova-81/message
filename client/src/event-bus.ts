export default class EventBus {
  listeners: { [key: string]: Function[] }; // eslint-disable-line @typescript-eslint/ban-types

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void { // eslint-disable-line @typescript-eslint/ban-types
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void { // eslint-disable-line @typescript-eslint/ban-types
    if (!this.listeners[event]) {
      throw new Error(`Missing event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any): void {
    if (!this.listeners[event]) {
      throw new Error(`Missing event: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
