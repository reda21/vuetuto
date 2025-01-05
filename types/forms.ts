export type FormField = {
  value: string;
  touched: boolean;
  dirty: boolean;
  pristine: boolean;
  valid: boolean;
  invalid: boolean;
  error: {
    message: string;
  } | null;
  errors: {
    message: string;
  }[];
};

export type Form = {
  valid: boolean;
  [key: string]: boolean | FormField;
};
