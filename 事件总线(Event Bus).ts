namespace EventBus {
  type EventCallback<T> = (...args: T[]) => void;
  interface EventBusOptions<T> {
    beforeSubscribe?: (event: keyof T, callback: Function) => void | boolean;
    subscribe?: (event: keyof T, callback: Function) => void;
    beforePublish?: (event: keyof T, ...args: any[]) => void | boolean;
    publish?: (event: keyof T, ...args: any[]) => void;
    beforeUnsubscribe?: (event: keyof T, callback: Function) => void | boolean;
    unsubscribe?: (event: keyof T, callback: Function) => void;
    beforeUnsubscribeEvent?: (event: keyof T) => void | boolean;
    unsubscribeEvent?: (event: keyof T) => void;
  }
  class EventBus<T> {
    private static instance: EventBus<any>;
    public options: EventBusOptions<T>;
    private constructor(options: EventBusOptions<T> = {}) {
      this.options = options;
    }
    static getInstance<T>(options: EventBusOptions<T>): EventBus<T> {
      if (!EventBus.instance) {
        EventBus.instance = new EventBus<T>(options);
      }
      return EventBus.instance;
    }

    // 事件列表
    private _subscribers: { [key in keyof T]?: Function[] } = {
      // [event]: [callback, callback, ...]
    }
    public get subscribers() {
      return this._subscribers;
    }

    // 订阅
    public subscribe<K extends keyof T>(event: keyof T, callback: EventCallback<T[K]>) {
      if (this.options.beforeSubscribe?.(event, callback) === false) return;

      if (!Array.isArray(this._subscribers[event])) this._subscribers[event] = [];
      this._subscribers[event]?.push(callback);

      this.options.subscribe?.(event, callback);
    }

    // 发布
    public publish<K extends keyof T>(event: keyof T, ...args: T[K][]) {
      if (this.options.beforePublish?.(event, ...args) === false) return;

      this._subscribers[event]?.forEach((callback) => {
        callback(...args);
      });

      this.options.publish?.(event, ...args);
    }

    // 执行一次订阅
    public once<K extends keyof T>(event: keyof T, callback: EventCallback<T[K]>) {
      const onceCallback = (...args: T[K][]) => {
        callback(...args);
        this.unsubscribe(event, onceCallback);
      };
      this.subscribe(event, onceCallback);
    }

    // 卸载订阅
    public unsubscribe<K extends keyof T>(event: keyof T, callback: EventCallback<T[K]>) {
      if (this.options.beforeUnsubscribe?.(event, callback) === false) return;

      this._subscribers[event] = this._subscribers[event]?.filter((item) => item !== callback);
      if (this._subscribers[event]?.length === 0) delete this._subscribers[event];

      this.options.unsubscribe?.(event, callback);
    }

    // 卸载事件
    public unsubscribeEvent(event: keyof T) {
      if (this.options.beforeUnsubscribeEvent?.(event) === false) return;

      delete this._subscribers[event];

      this.options.unsubscribeEvent?.(event);
    }

    // 清空
    public clear() {
      this._subscribers = {};
    }
  }

  type EventMap = {
    test: string,
    test1: string,
    test2: string,
    test3: string,
  };
  const eventBus = EventBus.getInstance<EventMap>({
    beforeSubscribe: (event, callback) => {
      console.log(`beforeSubscribe: ${event}, ${callback}`);
    },
    subscribe: (event, callback) => {
      console.log(`subscribe: ${event}, ${callback}`);
    },
    beforePublish: (event, ...args) => {
      console.log(`beforePublish: ${event}, ${args}`);
    },
    publish: (event, ...args) => {
      console.log(`publish: ${event}, ${args}`);
    },
    beforeUnsubscribe: (event, callback) => {
      console.log(`beforeUnsubscribe: ${event}, ${callback}`);
    },
    unsubscribe: (event, callback) => {
      console.log(`unsubscribe: ${event}, ${callback}`);
    },
  });

  // 订阅
  eventBus.subscribe('test', (data) => {
    console.log('test1', data);
  });
  eventBus.subscribe('test', (data) => {
    console.log('test2', data);
  });

  const test3 = (data: any) => {
    console.log('test3', data);
  };
  eventBus.subscribe('test', test3);

  // 只执行一次订阅
  eventBus.once('test', (data) => {
    console.log('test4', data);
  });

  // 发布
  eventBus.publish('test', 'hello world');
  eventBus.publish('test', 'hello world');

  // 卸载订阅
  eventBus.unsubscribe('test', test3);

  // 发布
  eventBus.publish('test', 'hello world');


  // 订阅发布
  eventBus.subscribe('test2', (data) => {
    console.log('test2.1', data);
  });
  eventBus.publish('test2', 'hello world');

  // 卸载事件
  eventBus.unsubscribeEvent('test');

  // 订阅列表
  console.log(eventBus.subscribers);

  // 清空订阅
  eventBus.clear();

  // 订阅列表
  console.log(eventBus.subscribers);
}
