import type { ValidatorOptions } from '@chantouchsek/validatorjs';
import { CustomError } from '@/utils/customError';
export type { ValidatorOptions };

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
  rules?: string | string[] | undefined;
}

export interface TypeRule {
  [attribute: string]: any | Array<any>;
}

export interface TypeInputs {
  [attribute: string]: any | Array<any>;
}

export type ValidationRules = Record<string, string | string[]>;

export interface FormMeta {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  pending: boolean;
  initialValues: Record<string, any>;
}

export interface FormContext {
  values: Record<string, any>;
  errors: CustomError;
  touched: Record<string, boolean>;
  rules?: ValidationRulesManager; // Ajout de la propriété rules
  isSubmitting: Ref<boolean>;
  isValidating: Ref<boolean>;
  meta: ComputedRef<FormMeta>;
  handleSubmit: (
    onValid: (values: Record<string, any>) => void,
    onInvalid?: (errors: Record<string, string>) => void
  ) => (e?: Event) => Promise<void>;
  setFieldValue: (field: string, value: any) => void;
  setValues: (fields: Record<string, any>) => void;
  setFieldTouched: (field: string, isTouched: boolean) => void;
  setTouched: (fields: Record<string, boolean>) => void;
}

export type UseFormType = (rules?: ValidationRules, options?: ValidatorOptions) => FormContext;

export interface UseFieldOptions<T = any> {
  name: string;
  rules?: string | string[];
  options?: ValidatorOptions;
  initialValue?: T;
}

export interface UseFieldReturn<T = any> {
  value: Ref<T>;
  errors: CustomError;
  handleBlur: () => void;
  handleChange: (e: Event) => void;
  meta: {
    touched: ComputedRef<boolean>;
    valid: ComputedRef<boolean>;
  };
}
