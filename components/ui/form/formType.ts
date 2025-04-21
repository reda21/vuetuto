// ~/components/ui/form/formType.ts
import type { Ref, ComputedRef } from 'vue';
import type { ValidatorOptions } from '@chantouchsek/validatorjs';
import { CustomError } from '@/utils/customError';
import { isValidDate } from '@/utils/date';
import { MetaForm } from '@/utils/metaForm';

export type ValidationRule =
  | string
  | ((value: any) => boolean | string)
  | { rule: string | ((value: any) => boolean | string); message?: string };

///export type ValidationRules = Record<string, ValidationRule | ValidationRule[]>;
export type ValidationRules = Record<string, string | string[]>;

export type FormContext = {
  values: Record<string, any>;
  errors: CustomError;
  rules: ValidationRulesManager;
  // validateForm: () => Promise<boolean>;
  handleSubmit: (
    onValid: (vals: Record<string, any>) => void,
    onInvalid?: (errs: Record<string, string>) => void
  ) => (e?: Event) => Promise<void>;
  asyncValidateWitchField: (field: string) => void;
  resetForm: () => void;
  setFieldValue: (name: string, value: any) => void;
  setValues: (fields: Record<string, any>) => void;
  meta: MetaForm;
  asyncValidators: Ref<Record<string, (value: any) => Promise<boolean | string>>>;
};

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
  meta: FieldMeta;
  hasError: ComputedRef<boolean>;
  oneError: ComputedRef<string | null>;
  errorList: ComputedRef<string[]>;
}

//composables\useField.ts :
export interface UseFieldOptions<T = any> {
  name: string;
  rules?: ValidationRule | ValidationRule[];
  options?: ValidatorOptions;
  initialValue?: T;
}

export interface UseFieldReturn<T = any> {
  value: Ref<T>;
  meta: FieldMeta;
  validateField: () => Promise<boolean>;
}

//composables\useForm.ts:
export interface UseFormOptions {
  schema?: ValidationRules;
  options?: ValidatorOptions;
  initialValues?: Record<string, any>;
  initialErrors?: Record<string, string>;
  initialTouched?: Record<string, boolean>;
  customMessages?: Record<string, any>;
}

export type UseFormReturn = {
  values: Record<string, any>;
  errors: CustomError;
  rules: ValidationRulesManager;
  setFieldValue: SetFieldValue;
  handleSubmit: (
    onValid: (vals: Record<string, any>) => void,
    onInvalid?: (errs: Record<string, string>) => void
  ) => (e?: Event) => Promise<void>;
  meta: any;
};

export type UseForm = (options: UseFormOptions) => UseFormReturn;

// composables/useValidator.ts :
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
  valid: Ref<boolean>;
  fails: Ref<boolean>;
  errors: CustomError;
  pending: Ref<boolean>;
}

export type SetFieldValue = (field: string, value: any) => void;
export type SetValues = (fields: Record<string, any>) => void;
export type SetFieldDirty = (field: string, isDirty: boolean) => void;
export type SetDirty = (fields: Record<string, boolean>) => void;
export type SetAllDirty = (isDirty: boolean) => void;
export type SetFieldTouched = (field: string, isTouched: boolean) => void;
export type SetTouched = (fields: Record<string, boolean>) => void;
export type SetAllTouched = (isTouched: boolean) => void;

export interface UseValidatorResult {
  addCustomRule: AddCustomRule;
  addCustomAsyncRule: AddCustomAsyncRule;
  validate: () => ValidationResult;
  asyncValidate: () => Promise<ValidationResult>;
  asyncValidateWitchField: (field: string) => void;
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
  meta: MetaForm;
  rules: ValidationRulesManager;
}

export type UseValidator = (options: UseValidatorParams) => UseValidatorResult;

//utils\metaForm.ts :
export interface FormMeta {
  touched: ComputedRef<boolean>;
  dirty: ComputedRef<boolean>;
  valid: ComputedRef<boolean>;
  pending: Ref<boolean>;
  validated: Ref<boolean>;
  initialValues: Record<string, any>;
  values: Record<string, any>;
}

export interface FieldMeta {
  path: string;
  touched: Ref<boolean>;
  dirty: Ref<boolean>;
  valid: Ref<boolean>;
  pending: Ref<boolean>;
  validated: Ref<boolean>;
  required: boolean;
}

/*
export interface MetaField {
  path: string;
  touched: ComputedRef<boolean>;
  dirty: ComputedRef<boolean>;
  valid: ComputedRef<boolean>;
  validated: ComputedRef<boolean>;
  pending: ComputedRef<boolean>;
  required: boolean;
  errors: ComputedRef<string[]>;
  type: 'default' | 'checkbox' | 'radio';
  multiple: false; // Indique si le champ peut contenir plusieurs valeurs (ex. multiple select, checkbox group, etc.).
}
*/
