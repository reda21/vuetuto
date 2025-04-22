<template>
  <div>
    <UiForm
      :schema="schema"
      :initialValues="init"
      @invalid-submit="onInvalidSubmit"
      v-slot="{ lazy, inputs, meta }"
      @submit="onSubmit"
    >
      <UiFormControl class="min-h-24" name="username" label="Username">
        <VInputText
          name="username"
          id="username"
          v-model="inputs.username"
          placeholder="username"
          :disabled="lazy"
          fluid
        />
      </UiFormControl>
      <UiFormControl class="min-h-24" name="name" label="name">
        <VInputText
          name="name"
          id="name"
          v-model="inputs.name"
          placeholder="name"
          :disabled="lazy"
          fluid
        />
      </UiFormControl>
      <UiFormControl class="min-h-24" name="email" label="Email">
        <VInputText
          type="email"
          name="email"
          id="email"
          v-model="inputs.email"
          placeholder="email"
          :disabled="lazy"
          fluid
        />
      </UiFormControl>
      <UiFormControl class="min-h-24" name="password" label="Password">
        <VInputText
          type="text"
          name="password"
          id="passowrd"
          v-model="inputs.password"
          placeholder="password"
          :disabled="lazy"
          fluid
        />
      </UiFormControl>
      <UiFormControl class="min-h-24" name="password_confirmation" label="password confirmation">
        <VInputText
          type="text"
          name="password_confirmation"
          id="password_confirmation"
          v-model="inputs.password_confirmation"
          placeholder="password confirmation"
          :disabled="lazy"
          fluid
        />
      </UiFormControl>
      <UiButton icon="pi pi-check" type="submit" label="Submit" :loading="lazy" />
    </UiForm>
  </div>
</template>

<script lang="ts" setup>
//components\formTest.vue
import type { TypeRule } from '@/components/ui/form/formType';

interface InputType {
  username: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const init: InputType = {
  username: 'reda21',
  name: 'reda21',
  email: 'redacherfaoui@gmail.com',
  password: 'bejaia21',
  password_confirmation: 'bejaia21',
};

const schema = {
  username: 'required|min:4|username_available',
  email: ['required', 'email'],
  name: ['required', 'same:username'],
  password: ['required', 'min:6', 'confirmed'],
  password_confirmation: 'required',
};

function onSubmit(values: Record<string, any>) {
  console.log('Valide :', values);
}

function onInvalidSubmit(errors: Record<string, string>) {
  console.log('Erreurs :', errors);
}
</script>
