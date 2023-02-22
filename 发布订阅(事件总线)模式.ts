namespace EventBus {
  class EventBus {
    private static instance: EventBus;
    private constructor() { }
    static getInstance(): EventBus {
      if (!EventBus.instance) {
        EventBus.instance = new EventBus();
      }
      return EventBus.instance;
    }

    private subscribers: { [key: string]: Function[] } = {};

    // 订阅
    subscribe(event: string, callback: Function) {
      if (!this.subscribers[event]) {
        this.subscribers[event] = [];
      }
      this.subscribers[event].push(callback);
    }

    // 取消订阅
    unsubscribe(event: string, callback: Function) {
      if (!this.subscribers[event]) {
        return;
      }
      this.subscribers[event] = this.subscribers[event].filter(
        (subscriber) => subscriber !== callback
      );
    }

    // 发布
    publish(event: string, data: any) {
      if (!this.subscribers[event]) {
        return;
      }
      this.subscribers[event].forEach((subscriber) => subscriber(data));
    }
  }

  // 测试
  const eventBus = EventBus.getInstance();
  const callback = (data: any) => {
    console.log(data);
  }
  eventBus.subscribe('test', callback);
  eventBus.publish('test', 'hello world');
  eventBus.unsubscribe('test', callback);
  eventBus.publish('test', 'hello world');
}
