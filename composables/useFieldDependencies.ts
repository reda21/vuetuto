// New file for field dependencies
export function useFieldDependencies() {
  const dependencies = new Map<string, string[]>();
  const dependencyValues = shallowRef<Record<string, any>>({});

  const addDependency = (field: string, dependsOn: string[]) => {
    dependencies.set(field, dependsOn);
  };

  return { dependencies, addDependency, dependencyValues };
}