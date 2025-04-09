// New file for form types
export type ValidationRule<T = any> = {
  validate: (value: T) => boolean | Promise<boolean>;
  message: string;
  params?: Record<string, any>;
};

export type FormValues<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};

export type ValidationResult<T> = {
  valid: boolean;
  errors?: string[];
  value: T;
};