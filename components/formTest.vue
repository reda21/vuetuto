<template>
  <div>
    <UiForm :schema="schema" :initialValues="init" @invalid-submit="onInvalidSubmit" v-slot="{ lazy, inputs }"
      @submit="onSubmit">
      <UiFormControl class="min-h-24" name="username" label="Username">
        <UiFormInput name="username" id="username" v-model="inputs.username" placeholder="username" :disabled="lazy" />
      </UiFormControl>
      <UiFormControl class="min-h-24" name="email" label="Email">
        <UiFormInput type="email" name="email" id="email" v-model="inputs.email" placeholder="email" :disabled="lazy" />
      </UiFormControl>
      <UiFormControl class="min-h-24" name="password" label="Password">
        <UiFormInput type="password" name="password" id="passowrd" v-model="inputs.password" placeholder="password"
          :disabled="lazy" />
      </UiFormControl>
      <UiFormControl class="min-h-24" name="password_confirmation" label="password confirmation">
        <UiFormInput type="password" name="password_confirmation" id="password_confirmation"
          v-model="inputs.password_confirmation" placeholder="password confirmation" :disabled="lazy" />
      </UiFormControl>
      <UiButton type="submit" :lazy="lazy">Submit</UiButton>
    </UiForm>
  </div>
</template>

<script lang="ts" setup>
//components\formTest.vue
import type { TypeRule } from '@/components/ui/form/formType';

interface InputType {
  username: string;
  email: string;
  password: string;
  password_confirmation: string
}

const init: Record<string, any> = {
  username: 'reda21',
  email: 'redacherfaoui@gmail.com',
  password: 'bejaia',
};

const schema = {
  username: ['required', 'min:3'],
  email: ['required', 'email'],
  password: ['required', 'min:6', "confirmed"],
  "password_confirmation": "required"
};

function onSubmit(values: Record<string, any>) {
  console.log('Valide :', values);
}

function onInvalidSubmit(errors: Record<string, string>) {
  console.log('Erreurs :', errors);
}

const onsubmit2 = ({ chengeLazy }: { chengeLazy: (value: boolean) => void }) => {
  chengeLazy(true);
  setTimeout(() => {
    chengeLazy(false);
  }, 3000);
};
</script>
