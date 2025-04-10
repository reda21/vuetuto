// New performance test file
import { describe, it, expect } from 'vitest';
import { useForm } from '~/composables/useForm';

describe('Form Performance', () => {
  it('should cache validation results', async () => {
    const { validateForm } = useForm({
      initialValues: { email: 'test@test.com' },
    });
    // ... performance test implementation
  });
});
