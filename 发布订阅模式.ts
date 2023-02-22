namespace PubSub {
  class PubSub {
    private static instance: PubSub;
    private constructor() { }
    static getInstance(): PubSub {
      if (!PubSub.instance) {
        PubSub.instance = new PubSub();
      }
      return PubSub.instance;
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
  const pubSub = PubSub.getInstance();
  const callback = (data: any) => console.log(data);
  pubSub.subscribe("test", callback);
  pubSub.publish("test", "hello world");
  pubSub.unsubscribe("test", callback);
  pubSub.publish("test", "hello world");
}
