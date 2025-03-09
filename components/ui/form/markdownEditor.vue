<template>
  <div class="markdown-editor">
    <div class="markdown-toolbar" @click="handleToolbarClick" ref="markdownToolbar">
      <button
        v-for="(action, key) in formatActions"
        :key="key"
        type="button"
        :data-format="key"
        :title="action.placeholder"
      >
        <UiIcon iconFamily="fa6-solid" :icon="getIcon(key)" />
        <sup v-if="['h1', 'h2', 'h3'].includes(key)">{{ key.slice(1) }}</sup>
      </button>
      <div class="flex-grow"></div>
      <button type="button" data-format="preview" title="Aperçu">
        <UiIcon iconFamily="fa6-solid" :icon="preview ? 'eye-slash' : 'eye'" />
      </button>
    </div>
    <textarea
      v-show="!preview"
      ref="markdownEditor"
      name="markdown"
      rows="8"
      class="markdown-input"
      :placeholder="placeholder"
      v-model="content"
      @keydown="handleKeyDown"
    />
    <div v-show="preview" class="markdown-preview" v-html="renderedContent"></div>
    <p class="mt-1 text-xs text-gray-400">
      Pour des conseils sur l'utilisation de Markdown,
      <a
        href="https://www.markdownguide.org"
        class="text-blog-accent hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        >cliquez ici</a
      >
    </p>
   </div>
</template>

<script lang="ts" setup>
import { useMarkdownEditor } from '@/composables/useMarkdownEditor';

// Remplacement de la variable content avec defineModel
const content = defineModel<string | null>({ required: false, default: null });

const {
  placeholder,
  markdownEditor,
  markdownToolbar,
  preview,
  renderedContent,
  formatActions,
  getIcon,
  handleToolbarClick,
  handleKeyDown,
} = useMarkdownEditor(content);
</script>
