import type {} from '@/components/ui/form/formType';
import { ValidationRulesManager } from '@/utils/validationRulesManager';

export interface FieldMeta {
  path: string;
  touched: Ref<boolean>;
  dirty: Ref<boolean>;
  valid: Ref<boolean>;
  pending: Ref<boolean>;
  validated: Ref<boolean>;
  required: boolean;
}


export interface FormMeta {
  touched: ComputedRef<boolean>;
  dirty: ComputedRef<boolean>;
  valid: ComputedRef<boolean>;
  pending: Ref<boolean>;
  validated: Ref<boolean>;
  initialValues: Record<string, any>;
  values: Record<string, any>;
}

export class MetaForm {
  touched: Record<string, boolean> = {};
  dirty: Record<string, boolean> = {};
  pending: Record<string, boolean> = {};
  initialValues: Record<string, any> = {};
  rules: ValidationRulesManager | null = null;
  values: Record<string, any> | null = null;
  validated = false;
  submitting = false;
  valid = false;

  constructor(
    initialValues: Record<string, any>,
    values: Record<string, any>,
    rules: ValidationRulesManager
  ) {
    this.initialValues = initialValues;
    this.rules = rules;
    this.values = values;
    this.touched = {};

    this.setDirty(initialValues);
    this.setTouched(initialValues);
    this.setPending(initialValues);
  }

  public setDirty(initialValues: Record<string, any>) {
    this.dirty = reactive<Record<string, boolean>>(
      Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
  }

  public setAllDirty(state: boolean): void {
    Object.keys(this.dirty).forEach((field) => {
      this.dirty[field] = state;
    });
  }

  public setTouched(initialValues: Record<string, any>) {
    this.touched = reactive<Record<string, boolean>>(
      Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
  }

  public setAllTouched(state: boolean): void {  
    Object.keys(this.touched).forEach((field) => {
      this.touched[field] = state;
    });
  }

  public setPending(initialValues: Record<string, any>) {
    this.pending = reactive<Record<string, boolean>>(
      Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      )
    );
  }

  public setFieldTouched(field: string, state: boolean): void {
    if (field in this.touched) {
      this.touched[field] = state;
    }
  }

  public setFieldDirty(field: string, state: boolean): void {
    if (field in this.dirty) {
      this.dirty[field] = state;
    }
  }

  public setFieldPending(field: string, state: boolean): void {
    if (field in this.pending) {
      this.pending[field] = state;
    }
  }

  public setAllPending(state: boolean): void {
    Object.keys(this.pending).forEach((field) => {
      this.pending[field] = state;
    });
  }

  public resetFieldPending(field: string): void {
    if (field in this.pending) {
      this.pending[field] = false;
    }
  }

  public resetAllPending(): void {
    this.setAllPending(false);
  }

  public setValidated(state: boolean): void {
    this.validated = state;
  }

  public setSubmitting(state: boolean): void {
    this.submitting = state;
  }

  public setValid(state: boolean): void {
    this.valid = state;
  }

  public getDirty(field?: string | string[]): Record<string, boolean> | boolean {
    if (typeof field === 'undefined') {
      return this.dirty;
    }
    if (typeof field === 'string') {
      return this.dirty?.[field] ?? false;
    }
    if (Array.isArray(field)) {
      return field.reduce((acc, f) => ({ ...acc, [f]: !!this.dirty[f] }), {});
    }
    return this.dirty;
  }

  public getTouched(field?: string | string[]): Record<string, boolean> | boolean {
    if (typeof field === 'undefined') {
      return this.touched;
    }
    if (typeof field === 'string') {
      return this.touched?.[field] ?? false;
    }
    if (Array.isArray(field)) {
      return field.reduce((acc, f) => ({ ...acc, [f]: !!this.touched[f] }), {});
    }
    return this.touched;
  }

  // Propriétés calculées globales

  public isTouched = computed(() => {
    return Object.values(this.touched).some(Boolean);
  });

  public isDirty = computed(() => {
    return Object.values(this.dirty).some(Boolean);
  });

  public isValid = computed(() => {
    return true;
  });

  public isPending = computed(() => {
    return Object.values(this.pending).some(Boolean);
  });

  public isvalidated = computed(() => {
    return this.validated;
  });

  public getFormMeta(): FormMeta {
    return {
      touched: this.isTouched,
      dirty: this.isDirty,
      valid: this.isValid,
      pending: this.isPending,
      validated: this.isvalidated,
      initialValues: this.initialValues,
      values: this.values ?? {},
    };
  }

  public getFieldMeta(field: string): FieldMeta {
    return {
      path: field,
      touched: computed(() => this.touched[field]),
      dirty: computed(() => this.dirty[field]),
      valid: computed(() => this.valid),
      pending: computed(() => this.pending[field]),
      validated: computed(() => this.validated),
      required: this.rules?.isRequired(field)?? false,
    };
  }
}