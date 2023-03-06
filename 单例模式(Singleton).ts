namespace Singleton {
  // 饿汉式
  class Singleton1 {
    // 在类加载时就实例化
    private static instance: Singleton1 = new Singleton1();
    private constructor() { }
    public static getInstance() {
      // 直接返回实例
      return this.instance;
    }
  }

  const s1 = Singleton1.getInstance();
  const s2 = Singleton1.getInstance();

  console.log(s1 === s2); // true

  // 懒汉式
  class Singleton2 {
    // 在类加载时不实例化
    private static instance: Singleton2;
    private constructor() { }
    public static getInstance() {
      // 在需要时才实例化，延迟加载
      if (!this.instance) {
        this.instance = new Singleton2();
      }
      return this.instance;
    }
  }

  const s3 = Singleton2.getInstance();
  const s4 = Singleton2.getInstance();

  console.log(s3 === s4); // true
}
