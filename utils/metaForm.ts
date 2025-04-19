import { ref, computed, reactive, type Ref, type ComputedRef } from 'vue';

// Interface pour les métadonnées d'un champ spécifique
export interface FieldMeta {
  touched: Ref<boolean>;
  dirty: Ref<boolean>;
  valid: Ref<boolean>;
  pending: Ref<boolean>;
  validated: Ref<boolean>;
  initialValue: any;
}

// Interface pour les métadonnées globales du formulaire
export interface FormMeta {
  touched: ComputedRef<boolean>;
  dirty: ComputedRef<boolean>;
  valid: ComputedRef<boolean>;
  pending: Ref<boolean>;
  validated: Ref<boolean>;
  initialValues: Record<string, any>;
  values: Record<string, any>; // Référence aux valeurs actuelles du formulaire
}

export class MetaForm {
  private fieldMeta: Record<string, FieldMeta> = reactive({});
  private formValues: Record<string, any>; // Garde une référence aux valeurs du formulaire
  private formInitialValues: Record<string, any>;

  // Métadonnées globales du formulaire
  public pending = ref(false);
  public validated = ref(false);

  constructor(initialValues: Record<string, any>, formValues: Record<string, any>) {
    this.formInitialValues = { ...initialValues };
    this.formValues = formValues; // Stocke la référence
    this.initializeFieldMeta(initialValues);
  }

  private initializeFieldMeta(values: Record<string, any>): void {
    for (const key in values) {
      this.ensureFieldMeta(key, values[key]);
    }
  }

  private ensureFieldMeta(field: string, initialValue: any): FieldMeta {
    if (!this.fieldMeta[field]) {
      this.fieldMeta[field] = reactive({
        touched: ref(false),
        dirty: ref(false),
        valid: ref(true), // Par défaut, un champ est considéré valide
        pending: ref(false),
        validated: ref(false),
        initialValue: initialValue,
      });
    }
    return this.fieldMeta[field];
  }

  // --- Méthodes pour les métadonnées de champ ---

  public getFieldMeta(field: string): FieldMeta | undefined {
    return this.fieldMeta[field];
  }

  public setFieldTouched(field: string, state: boolean): void {
    this.ensureFieldMeta(field, this.formInitialValues[field]).touched.value = state;
  }

  public setFieldDirty(field: string, state: boolean): void {
    this.ensureFieldMeta(field, this.formInitialValues[field]).dirty.value = state;
  }

  public setFieldValid(field: string, state: boolean): void {
    this.ensureFieldMeta(field, this.formInitialValues[field]).valid.value = state;
  }

  public setFieldPending(field: string, state: boolean): void {
    this.ensureFieldMeta(field, this.formInitialValues[field]).pending.value = state;
  }

  public setFieldValidated(field: string, state: boolean): void {
    this.ensureFieldMeta(field, this.formInitialValues[field]).validated.value = state;
  }

  public resetFieldMeta(field: string): void {
    const meta = this.getFieldMeta(field);
    if (meta) {
      meta.touched.value = false;
      meta.dirty.value = false;
      meta.valid.value = true;
      meta.pending.value = false;
      meta.validated.value = false;
    }
  }

  // --- Méthodes pour les métadonnées globales du formulaire ---

  public setAllTouched(state: boolean): void {
    Object.keys(this.fieldMeta).forEach(field => {
      this.setFieldTouched(field, state);
    });
  }

  public setAllDirty(state: boolean): void {
    Object.keys(this.fieldMeta).forEach(field => {
      this.setFieldDirty(field, state);
    });
  }

  public resetFormMeta(): void {
    this.pending.value = false;
    this.validated.value = false;
    Object.keys(this.fieldMeta).forEach(field => {
      this.resetFieldMeta(field);
    });
  }

  // --- Propriétés calculées globales ---

  public isTouched = computed(() => {
    return Object.values(this.fieldMeta).some(meta => meta.touched.value);
  });

  public isDirty = computed(() => {
    return Object.values(this.fieldMeta).some(meta => meta.dirty.value);
  });

  public isValid = computed(() => {
    return Object.values(this.fieldMeta).every(meta => meta.valid.value);
  });

  // --- Accès aux métadonnées combinées ---

  public getFormMeta(): FormMeta {
    return {
      touched: this.isTouched,
      dirty: this.isDirty,
      valid: this.isValid,
      pending: this.pending,
      validated: this.validated,
      initialValues: this.formInitialValues,
      values: this.formValues, // Retourne la référence aux valeurs
    };
  }
}