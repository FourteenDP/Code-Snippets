namespace Algorithm {
  export class LRU {
    // 缓存容量
    private capacity: number;
    // 缓存
    private _cache: Map<string, number>;
    constructor(capacity: number) {
      // 初始化容量
      this.capacity = capacity;
      // 初始化缓存
      this._cache = new Map();
    }

    public get cache() {
      return this._cache;
    }

    // 获取缓存
    get(key: string): number {
      // 如果缓存中存在该值，则将该值删除并重新添加到缓存中，以保证该值是最近使用的
      if (this._cache.has(key)) {
        const value = this._cache.get(key)!;
        this._cache.delete(key);
        this._cache.set(key, value);
        return value;
      }
      return -1;
    }
    // 添加缓存
    put(key: string, value: number): void {
      // 如果缓存中存在该值，则将该值删除并重新添加到缓存中，以保证该值是最近使用的
      if (this._cache.has(key)) {
        this._cache.delete(key);
      } else
        // 如果缓存中不存在该值，且缓存已满，则删除最近最少使用的值
        if (this._cache.size >= this.capacity) {
          this._cache.delete(this._cache.keys().next().value);
        }
      // 添加缓存
      this._cache.set(key, value);
    }
  }

  // 实例化一个容量为2的缓存
  const lru = new LRU(2);
  lru.put('a', 1);            // 当前缓存：Map { 'a' => 1 }
  lru.put('b', 2);            // 当前缓存：Map { 'a' => 1, 'b' => 2 }
  console.log(lru.get('a'));  // 当前缓存：Map { 'b' => 2, 'a' => 1 }
  lru.put('c', 3);            // 当前缓存：Map { 'a' => 1, 'c' => 3 }
  console.log(lru.get('b'));  // 当前缓存：Map { 'a' => 1, 'c' => 3 }
  lru.put('d', 4);            // 当前缓存：Map { 'c' => 3, 'd' => 4 }
  console.log(lru.get('a'));  // 当前缓存：Map { 'c' => 3, 'd' => 4 }
  console.log(lru.get('c'));  // 当前缓存：Map { 'd' => 4, 'c' => 3 }
  console.log(lru.get('d'));  // 当前缓存：Map { 'c' => 3, 'd' => 4 }
}
