import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useCounterStore } from "../stores/counter";

describe('Counter Store', () => {
  let counterStore: ReturnType<typeof useCounterStore>;

  beforeEach(() => {
    // Crée une nouvelle instance de Pinia avant chaque test
    setActivePinia(createPinia());
    counterStore = useCounterStore();
  });

  it('initializes with a count of 0', () => {
    expect(counterStore.count).toBe(0);
  });

  it('increments the count', () => {
    counterStore.increment();
    expect(counterStore.count).toBe(1);
  });

  it('resets the count', () => {
    counterStore.count = 5;
    counterStore.reset();
    console.info(counterStore.count)
    expect(counterStore.count).toBe(0);
  });

  it('calculates doubleCount correctly', () => {
    counterStore.count = 3;
    expect(counterStore.doubleCount).toBe(6);
  });
});
