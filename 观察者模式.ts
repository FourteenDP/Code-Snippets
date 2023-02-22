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
}
