// New test file
import { describe, it, expect } from 'vitest';
import { useForm } from '~/composables/useForm';

describe('Form Validation', () => {
  it('should validate form fields correctly', async () => {
    const { handleSubmit } = useForm({
      initialValues: { email: 'test' },
      schema: { email: 'required|email' }
    });
    // ... test implementation
  });
});