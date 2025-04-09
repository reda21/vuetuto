export type ErrorType = Record<string, any | any[]>;

export class CustomError {
  private items: ErrorType;

  constructor() {
    this.items = ref({});
  }

  setOne(key: string, value: any): void {
    if (typeof value === 'string') this.items.value[key] = [value];
    else {
      this.items.value[key] = value;
    }
  }

  set(key: string, value: any | any[]): void {
    if (typeof value === 'string') {
      // Si la valeur est une chaîne de caractères, on l'ajoute à un tableau
      if (this.items.value[key]) {
        if (Array.isArray(this.items.value[key])) {
          this.items.value[key].push(value);
        } else {
          this.items.value[key] = [this.items.value[key], value];
        }
      } else {
        this.items.value[key] = [value];
      }
    } else {
      // Si la valeur est un tableau ou undefined, on l'assigne directement
      this.items.value[key] = value;
    }
  }

  setAll(items: ErrorType): void {
    this.clearAll();
    const _items: ErrorType = {};
    for (const key in items) {
      if (Array.isArray(items[key])) {
        _items[key] = items[key]; // Garde le tableau intact
      } else {
        _items[key] = [items[key]]; // Transforme une chaîne de caractères en un tableau contenant cette chaîne
      }
    }
    this.items.value = { ..._items };
  }

  get(key: string): string[] {
    return this.items.value[key];
  }

  has(key: string): boolean {
    return key in this.items.value;
  }

  all(): ErrorType {
    return this.items.value;
  }

  clear(key: string): void {
    delete this.items.value[key];
  }

  clearAll(): void {
    this.items.value = {};
  }

  first(key: string): any {
    return this.has(key) ? this.get(key)[0] : null;
  }
}
