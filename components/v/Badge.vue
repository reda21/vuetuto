<template>
    <Badge unstyled :pt="theme" :data-b="variant" :ptOptions="{
            mergeProps: ptViewMerge
        }">
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Badge>
</template>

<script setup lang="ts">
//@ts-ignore
import Badge, { type BadgePassThroughOptions, type BadgeProps } from 'primevue/badge';
//@ts-ignore
import { ref, defineProps, withDefaults } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ BadgeProps {
    variant?:  'outlined' | 'ghost' | 'link' | undefined;
}
const props = withDefaults(defineProps<Props>(), {    
});

const theme = ref<BadgePassThroughOptions>({
    root: `badge`
});
</script>
