<template>
  <div class="markdown-editor relative border rounded-lg overflow-hidden">
    <div class="markdown-toolbar flex items-center gap-1 p-2 bg-gray-100 dark:bg-gray-800" @click="handleToolbarClick">
      <button v-for="(action, key) in formatActions" :key="key" type="button" :data-format="action.format" :title="action.placeholder">
        <UiIcon iconFamily="fa6-solid" :icon="getIcon(action.format)" />
        <sup v-if="['h1', 'h2', 'h3'].includes(action.format)">{{ action.format.slice(1) }}</sup>
      </button>
      <div class="flex-grow"></div>
      <button type="button" data-format="preview" title="Aperçu" @click="togglePreview">
        <UiIcon iconFamily="fa6-solid" icon="eye" />
      </button>
    </div>
    <textarea v-if="!isPreview" ref="markdownEditor" rows="8" class="markdown-input" :placeholder="placeholder" v-model="content" />
    <div v-else class="markdown-preview p-4" v-html="renderedMarkdown"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { marked } from 'marked';

interface MarkdownAction {
  format: string;
  placeholder: string;
  wrapper: (text: string) => string;
}

const placeholder = "Écrivez votre contenu en Markdown ici...";
const markdownEditor = ref<HTMLTextAreaElement | null>(null);
const content = ref<string>('');
const isPreview = ref<boolean>(false);
const history = ref<string[]>([]);
const historyIndex = ref<number>(-1);

const renderedMarkdown = computed(() => marked(content.value));

watch(content, (newVal) => {
  if (history.value[historyIndex.value] !== newVal) {
    history.value.push(newVal);
    historyIndex.value++;
  }
});

const formatActions: Record<string, MarkdownAction> = {
  bold: { format: 'bold', placeholder: 'texte en gras', wrapper: (text) => `**${text}**` },
  italic: { format: 'italic', placeholder: 'texte en italique', wrapper: (text) => `*${text}*` },
  strikethrough: { format: 'strikethrough', placeholder: 'texte barré', wrapper: (text) => `~~${text}~~` },
  h1: { format: 'h1', placeholder: 'Titre 1', wrapper: (text) => `# ${text}\n` },
  h2: { format: 'h2', placeholder: 'Titre 2', wrapper: (text) => `## ${text}\n` },
  h3: { format: 'h3', placeholder: 'Titre 3', wrapper: (text) => `### ${text}\n` },
  quote: { format: 'quote', placeholder: 'Citation', wrapper: (text) => `> ${text}` },
  code: { format: 'code', placeholder: 'code', wrapper: (text) => `\`${text}\`` },
  codeblock: { format: 'codeblock', placeholder: 'bloc de code', wrapper: (text) => `\n\n\`\`\`\n${text}\n\`\`\`\n\n` },
  ul: { format: 'ul', placeholder: 'Élément de liste', wrapper: (text) => `- ${text}` },
  ol: { format: 'ol', placeholder: 'Élément de liste numérotée', wrapper: (text, i = 1) => `${i}. ${text}` },
  task: { format: 'task', placeholder: 'Tâche à faire', wrapper: (text) => `- [ ] ${text}` },
  link: { format: 'link', placeholder: 'Texte du lien', wrapper: (text) => `[${text}](https://example.com)` },
  image: { format: 'image', placeholder: 'Image', wrapper: () => '![Description](https://example.com/image.jpg)' },
  table: { format: 'table', placeholder: '', wrapper: () => '| Col 1 | Col 2 | Col 3 |\n|---|---|---|\n| 1 | 2 | 3 |' },
  hr: { format: 'hr', placeholder: '', wrapper: () => '\n\n---\n\n' }
};

const handleToolbarClick = (event: MouseEvent) => {
  const target = (event.target as HTMLElement).closest('button');
  if (!target) return;
  const format = target.getAttribute('data-format');
  if (!format) return;
  if (format === 'preview') {
    togglePreview();
    return;
  }
  const action = formatActions[format];
  if (!action) return;
  insertText(action.wrapper(content.value || action.placeholder));
};

const insertText = (text: string) => {
  if (!markdownEditor.value) return;
  const textarea = markdownEditor.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.setRangeText(text, start, end, 'end');
  textarea.focus();
};

const togglePreview = () => {
  isPreview.value = !isPreview.value;
};

const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--;
    content.value = history.value[historyIndex.value];
  }
};

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'z') {
    event.preventDefault();
    undo();
  }
});

const getIcon = (format: string): string => {
  const icons: Record<string, string> = {
    bold: 'bold', italic: 'italic', strikethrough: 'strikethrough', h1: 'heading',
    h2: 'heading', h3: 'heading', quote: 'quote-right', code: 'code', codeblock: 'file-code',
    ul: 'list-ul', ol: 'list-ol', task: 'tasks', link: 'link', image: 'image',
    table: 'table', hr: 'minus', preview: 'eye'
  };
  return icons[format] || 'question';
};
</script>
