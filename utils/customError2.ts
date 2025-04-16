export type ErrorType<T> = {
  [K in keyof T]?: string[];
};

export class CustomError<T extends Record<string, any>> {
  private items: { value: ErrorType<T> };

  constructor() {
    this.items = { value: {} as ErrorType<T> };
  }

  setOne<K extends keyof T>(key: K, value: any): void {
    if (typeof value === 'string') this.items.value[key] = [value];
    else {
      this.items.value[key] = value;
    }
  }

  set<K extends keyof T>(key: K, value: any | any[]): void {
    if (typeof value === 'string') {
      if (this.items.value[key]) {
        if (Array.isArray(this.items.value[key])) {
          (this.items.value[key] as string[]).push(value);
        } else {
          this.items.value[key] = [this.items.value[key] as string, value];
        }
      } else {
        this.items.value[key] = [value];
      }
    } else {
      this.items.value[key] = value;
    }
  }

  setAll(items: Partial<Record<keyof T, string | string[]>>): void {
    this.clearAll();
    const _items: ErrorType<T> = {};
    for (const key in items) {
      if (Array.isArray(items[key])) {
        _items[key as keyof T] = items[key] as string[];
      } else {
        _items[key as keyof T] = [items[key] as string];
      }
    }
    this.items.value = { ..._items };
  }

  get<K extends keyof T>(key: K): string[] | undefined {
    return this.items.value[key];
  }

  has<K extends keyof T>(key: K): boolean {
    return key in this.items.value;
  }

  all(): ErrorType<T> {
    return this.items.value;
  }

  clear<K extends keyof T>(key: K): void {
    delete this.items.value[key];
  }

  clearAll(): void {
    this.items.value = {} as ErrorType<T>;
  }

  first<K extends keyof T>(key: K): any {
    return this.has(key) ? this.get(key)?.[0] : null;
  }
}
