import { Password } from '../.nuxt/components';
<template>
  <div>
    <UiForm
      :validation-rules="schema"
      @invalid-submit="onInvalidSubmit"
      v-slot="{ lazy }"
      @submit="onSubmit"
    >
      <UiFormControl name="username" label="Username">
        <UiFormInput
          name="username"
          id="username"
          v-model="inputs.username"
          placeholder="username"
          :disabled="lazy"
        />
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
  username: '',
  email: '',
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
