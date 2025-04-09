// New file for form history
export function useFormHistory() {
  const history = ref<Array<{
    values: Record<string, any>;
    timestamp: number;
  }>>([]);

  const addToHistory = (values: Record<string, any>) => {
    history.value.push({
      values: structuredClone(values),
      timestamp: Date.now()
    });
  };

  return { history, addToHistory };
}