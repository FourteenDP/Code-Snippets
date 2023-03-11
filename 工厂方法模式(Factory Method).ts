namespace DesignPatterns.FactoryMethod {
  // 产品接口
  interface Product {
    use(): void;
    getOwner(): string;
  }

  // 产品的具体实现
  class IDCard implements Product {
    private owner: string;
    constructor(owner: string) {
      console.log(`制作${owner}的ID卡`);
      this.owner = owner;
    }
    use(): void {
      console.log(`使用${this.owner}的ID卡`);
    }
    getOwner(): string {
      return this.owner;
    }
  }

  // 工厂抽象类
  abstract class Factory {
    create(owner: string): Product {
      const p = this.createProduct(owner);
      this.registerProduct(p);
      return p;
    }
    protected abstract createProduct(owner: string): Product;
    protected abstract registerProduct(product: Product): void;
  }

  // 工厂的具体实现
  class IDCardFactory extends Factory {
    private owners: string[] = [];
    protected createProduct(owner: string): Product {
      return new IDCard(owner);
    }
    protected registerProduct(product: Product): void {
      this.owners.push(product.getOwner());
    }
    getOwners(): string[] {
      return this.owners;
    }
  }

  // 客户端
  const factory = new IDCardFactory();
  const card1 = factory.create('张三');
  const card2 = factory.create('李四');
  const card3 = factory.create('王五');
  card1.use();
  card2.use();
  card3.use();
  console.log(factory.getOwners());
}
