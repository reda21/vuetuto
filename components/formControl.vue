<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
      Username
    </label>
    <slot> No data </slot>
    <pre>
        {{ form ?? "no data" }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import type { Form } from "@/types/forms";

const $pcForm = inject("$pcForm");
console.info("$pcForm", $pcForm.$form);

//recuperer props $form avec type Form
const form = defineProps<{
  form: Form;
}>();
</script>
