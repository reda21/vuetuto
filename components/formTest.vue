import { Password } from '../.nuxt/components';
<template>
  <div>
    <UiForm :rules="rules" :inputs="inputs" v-slot="{ lazy, errors }" @submit="onsubmit">
      <UiFormControl name="username" label="Username">
        <UiFormInput name="username" id="username" v-model="inputs.username" placeholder="username" :disabled="lazy" />
      </UiFormControl>
      <UiFormControl name="email" label="Email">
        <UiFormInput type="email" name="email" id="email" v-model="inputs.email" placeholder="email" :disabled="lazy" />
      </UiFormControl>
      <UiFormControl name="password" label="Password">
        <UiFormInput type="password" name="password" id="password" v-model="inputs.password" :disabled="lazy" />
      </UiFormControl>
      <UiButton type="submit" :lazy="lazy">Submit</UiButton>
      <pre>
      {{ errors }}
    </pre>
    </UiForm>
  </div>
</template>

<script lang="ts" setup>
import type { TypeRule } from "@/components/ui/form/formType"

interface InputType {
  username: string;
  email: string,
  password: string
}

//rules
const rules: TypeRule = {
  username: ["required", "min:18"],
  email: ["required", "email"],
  password: "required",
};

const inputs = reactive<InputType>({
  username: '',
  email: '',
  password: ''
})

const onsubmit = ({ chengeLazy }: { chengeLazy: (value: boolean) => void }) => {
  chengeLazy(true);
  setTimeout(() => {
    chengeLazy(false);
  }, 3000);
}
</script>

<style>

</style>