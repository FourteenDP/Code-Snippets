// 发布订阅模式
namespace PubSub {
  class PubSub {
    private events: any;
    constructor() {
      this.events = {};
    }
    on(event: string, callback: Function) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
    emit(event: string, ...args: any[]) {
      if (this.events[event]) {
        this.events[event].forEach((callback: Function) => {
          callback(...args);
        });
      }
    }
    off(event: string, callback: Function) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(
          (cb: Function) => cb !== callback
        );
      }
    }
  }
}
