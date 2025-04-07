import type { ValidatorOptions } from '@chantouchsek/validatorjs';

export type { ValidatorOptions}

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {});

export type sizeType = 'small' | 'large' | undefined | null;

export interface InputProps {
  type?: InputType;
  name?: string;
  id?: string;
  placeholder?: string;
  // value?: string;
  disabled?: boolean;
  fluid?: boolean;
  size?: sizeType;
  invalid?: boolean | undefined | null;
  variant?: 'outlined' | 'filled' | undefined | null;
}

export interface TypeRule {
  [attribute: string]: any | Array<any>;
}

export interface TypeInputs {
  [attribute: string]: any | Array<any>;
}

export type ValidationRules = Record<string, string | string[]>;

export interface FormContext {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  rules?: ValidationRules; // Ajout de la propriété rules
  handleSubmit: (
    onValid: (values: Record<string, any>) => void,
    onInvalid?: (errors: Record<string, string>) => void
  ) => (e?: Event) => Promise<void>;
}

export type UseFormType = (rules?: ValidationRules, options?: ValidatorOptions) => FormContext;

export interface UseFieldOptions<T = any> {
  name: string;
  rules?: ValidationRules;
  options?: ValidatorOptions;
  initialValue?: T;
}

export interface UseFieldReturn<T = any> {
  value: Ref<T>;
  errorMessage: ComputedRef<string>;
  handleBlur: () => void;
  handleChange: (e: Event) => void;
  meta: {
    touched: ComputedRef<boolean>;
    valid: ComputedRef<boolean>;
  };
}
