namespace Observer {
  // 被观察者
  class Subject {
    private observers: Observer[] = [];
    public attach(observer: Observer) {
      this.observers.push(observer);
    }
    public detach(observer: Observer) {
      this.observers = this.observers.filter((o) => o !== observer);
    }
    public notify(...args: any[]) {
      this.observers.forEach((observer) => {
        observer.update(...args);
      });
    }
  }

  // 观察1
  class Observer {
    public update(...args: any[]) {
      console.log(args);
    }
  }

  const subject = new Subject();
  const observer1 = new Observer();
  const observer2 = new Observer();

  subject.attach(observer1);
  subject.attach(observer2);

  subject.notify(1, 2, 3);

  subject.detach(observer1);

  subject.notify(4, 5, 6);
}
