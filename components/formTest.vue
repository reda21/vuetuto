import { Password } from '../.nuxt/components';
<template>
  <div>
    <UiForm :validation-rules="schema" @invalid-submit="onInvalidSubmit" v-slot="{ lazy }" @submit="onSubmit">
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
      <UiButton type="submit" :lazy="lazy">Submit</UiButton>
    </UiForm>
  </div>
</template>

<script lang="ts" setup>
import type { TypeRule } from '@/components/ui/form/formType';

interface InputType {
  username: string;
  email: string;
  password: string;
}

//rules
const rules: TypeRule = {
  username: ['required', 'min:18'],
  email: ['required', 'email'],
  password: 'required',
};

const inputs = reactive<InputType>({
  username: 'reda21',
  email: 'redacherfaoui@gmail',
  password: '',
});

const schema = {
  username: ['required', 'min:18'],
  email: ['required', 'email'],
  password: 'required',
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

<style></style>
