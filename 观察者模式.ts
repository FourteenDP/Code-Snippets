// 观察者模式
namespace Observer {
  class Subject {
    private observers: Observer[] = [];
    // 添加观察者
    addObserver(observer: Observer) {
      this.observers.push(observer);
    }
    // 删除观察者
    removeObserver(observer: Observer) {
      this.observers = this.observers.filter(
        (item) => item !== observer
      );
    }
    // 通知观察者
    notifyObservers(data: any) {
      this.observers.forEach((observer) => observer.update(data));
    }
  }

  class Observer {
    update(data: any) {
      console.log(data);
    }
  }

  // 测试
  const subject = new Subject();

  const observer1 = new Observer();
  const observer2 = new Observer();
  const observer3 = new Observer();

  subject.addObserver(observer1);
  subject.addObserver(observer2);
  subject.addObserver(observer3);

  subject.notifyObservers('hello world');

  subject.removeObserver(observer2);

  subject.notifyObservers('hello world');

}
