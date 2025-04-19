<template>
    <InputText unstyled :pt="theme" :ptOptions="ptOptions" v-model="value" @input="handleChange" @blur="handleBlur"
        :disabled="disabling" :invalid="i" />       
</template>

<script setup lang="ts">
// @ts-ignore
import InputText, { type InputTextPassThroughOptions, type InputTextProps } from 'primevue/inputtext';
// @ts-ignore
import { ref, defineProps, defineModel, withDefaults } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ InputTextProps {
    name: string;
    rules?: string | string[] | undefined;
    invalid?: boolean;
    disabled?: boolean;

}

const props = withDefaults(defineProps<Props>(), {
    invalid: false,
    disabled: false,
});

//w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blog-accent
const theme = ref<InputTextPassThroughOptions>({
    root: `appearance-none rounded-md outline-hidden
        bg-light-input dark:bg-dark-input
        p-filled:bg-surface-50 dark:p-filled:bg-surface-800
        text-surface-950 dark:text-surface-0
        placeholder:text-surface-500 dark:placeholder:text-surface-400
        border border-surface-300 dark:border-surface-700
        enabled:hover:border-accent dark:enabled:hover:border-accent
        enabled:focus:border-accent focus:ring-2 focus:ring-accent
        disabled:bg-light-input-disabled disabled:text-surface-500
        dark:disabled:bg-dark-input-disabled dark:disabled:text-surface-400
        p-invalid:border-danger dark:p-invalid:border-red-300 p-invalid:text-danger
        p-invalid:placeholder:text-danger dark:p-invalid:placeholder:text-red-400 p-invalid:focus:ring-danger
        px-3 py-2 p-fluid:w-full
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`
})
//get model value
const value = defineModel<string | null>({ required: false, default: null });

const ptOptions = computed(() => ({
    mergeProps: ptViewMerge
}))

//computed
const i = computed(() => {
    return (props.invalid ?? false) || hasError.value
})

const disabling = computed(() => {
    // disabled || meta.pending
    return meta.pending.value || props.disabled;
})

//useField
const { handleChange, handleBlur,  hasError, meta } = useField({
    name: props.name,
    initialValue: value.value,
    rules: props.rules,
});
</script>
