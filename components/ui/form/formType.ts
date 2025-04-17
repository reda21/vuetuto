// ~/components/ui/form/formType.ts
import type { Ref, ComputedRef } from 'vue';
import type { ValidatorOptions } from '@chantouchsek/validatorjs';
import { CustomError } from '@/utils/customError';
import { isValidDate } from '../../../utils/date';

export type ValidationRule =
  | string
  | ((value: any) => boolean | string)
  | { rule: string | ((value: any) => boolean | string); message?: string };

///export type ValidationRules = Record<string, ValidationRule | ValidationRule[]>;

export type FormContext = {
  values: Record<string, any>;
  errors: CustomError;
  rules: ValidationRulesManager;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isSubmitting: Ref<boolean>;
  isValidating: Ref<boolean>;
  isValidated: Ref<boolean>;
  validateForm: () => Promise<boolean>;
  handleSubmit: (
    onValid: (vals: Record<string, any>) => void,
    onInvalid?: (errs: Record<string, string>) => void
  ) => (e?: Event) => Promise<void>;
  resetForm: () => void;
  setFieldValue: (name: string, value: any) => void;
  setValues: (fields: Record<string, any>) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setTouched: (fields: Record<string, boolean>) => void;
  setFieldDirty: (name: string, touched: boolean) => void;
  setDirty: (fields: Record<string, boolean>) => void;
  meta: ComputedRef<FormMeta>;
  asyncValidators: Ref<Record<string, (value: any) => Promise<boolean | string>>>;
};

/*
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
*/

export interface UseFieldOptions<T = any> {
  name: string;
  rules?: ValidationRule | ValidationRule[];
  options?: ValidatorOptions;
  initialValue?: T;
}

export interface MetaField {
  path: string;
  touched: ComputedRef<boolean>;
  dirty: ComputedRef<boolean>;
  valid: ComputedRef<boolean>;
  validated: ComputedRef<boolean>;
  pending: boolean;
  required: boolean;
  errors: ComputedRef<string[]>;
  type: 'default' | 'checkbox' | 'radio';
  multiple: false; // Indique si le champ peut contenir plusieurs valeurs (ex. multiple select, checkbox group, etc.).
}

export interface UseFieldReturn<T = any> {
  value: Ref<T>;
  meta: MetaField;
  validateField: () => Promise<boolean>;
}

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

export type UseFormType = (rules?: ValidationRules, options?: ValidatorOptions) => FormContext;

export interface UseFieldOptions<T = any> {
  name: string;
  rules?: ValidationRule | ValidationRule[];
  options?: ValidatorOptions;
  initialValue?: T;
}

export interface UseFieldReturn<T = any> {
  value: Ref<T>;
  errors: CustomError;
  handleBlur: () => void;
  handleChange: (e: Event) => void;
  meta: MetaField;
  hasError: boolean;
}

//use Validator
export type AddCustomRule = (
  ruleName: string,
  callback: (value: any) => boolean,
  errorMessage: string
) => void;

export type AddCustomAsyncRule = (
  ruleName: string,
  callback: (
    value: string,
    attribute: string,
    req: any,
    passes: (success?: boolean, message?: string) => void
  ) => void,
  errorMessage: string
) => void;

export interface UseValidatorParams {
  initialValues?: Record<string, any>;
  schema?: ValidationRules;
  customMessages?: Record<string, any>;
  initialErrors?: Record<string, string>;
  options?: ValidatorOptions;
  initialTouched?: Record<string, boolean>;
}

export interface ValidationResult {
  valid: boolean;
  fails: boolean;
  errors: CustomError;
  isValidating: Ref<boolean>;
}

export type SetFieldValue = (field: string, value: any) => void
export type SetValues = (fields: Record<string, any>) => void
export type SetFieldDirty = (field: string, isDirty: boolean) => void
export type SetDirty = (fields: Record<string, boolean>) => void
export type SetAllDirty = (isDirty: boolean) => void;
export type SetFieldTouched = (field: string, isTouched: boolean) => void;
export type SetTouched = (fields: Record<string, boolean>) => void;
export type SetAllTouched = (isTouched: boolean) => void;

export interface UseValidatorResult {
  addCustomRule: AddCustomRule;
  addCustomAsyncRule: AddCustomAsyncRule;
  validate: () => ValidationResult;
  asyncValidate: () => Promise<ValidationResult>;
  setFieldValue: SetFieldValue;
  setValues: SetValues;
  setFieldDirty: SetFieldDirty;
  setDirty: SetDirty;
  setAllDirty: SetAllDirty;
  setFieldTouched: SetFieldTouched;
  setTouched: SetTouched;
  setAllTouched: SetAllTouched;
  values: Record<string, any>;
  errors: CustomError;
  meta: ComputedRef<Partial<FormMeta>>;
  rules: ValidationRulesManager;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isValidated: Ref<boolean>;
  isValidating: Ref<boolean>;
  isSubmitting: Ref<boolean>;
}

export type UseValidator = (options: UseValidatorParams) => UseValidatorResult;
