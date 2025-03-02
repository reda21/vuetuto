<template>
  <div class="markdown-editor">
    <div class="markdown-toolbar" @click="handleToolbarClick" ref="markdownToolbar">
      <button v-for="(action, key) in formatActions" :key="key" type="button" :data-format="action.format"
        :title="action.placeholder">
        <UiIcon iconFamily="fa6-solid" :icon="getIcon(action.format)" />
        <sup v-if="['h1', 'h2', 'h3'].includes(action.format)">{{ action.format.slice(1) }}</sup>
      </button>
      <div class="flex-grow"></div>
      <button type="button" data-format="preview" title="Aperçu">
        <UiIcon iconFamily="fa6-solid" :icon="preview ? 'eye-slash' : 'eye'" />
      </button>
    </div>
    <textarea :class="preview ? 'hidden' : ''" ref="markdownEditor" name="markdown" rows="8" class="markdown-input"
      :placeholder="placeholder" v-model="content" />
    <!-- Aperçu (caché par défaut) -->
    <div id="markdown-preview" :class="!preview ? 'hidden' : ''" class="markdown-preview">
      <!-- Le contenu de l'aperçu sera injecté ici -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { marked } from "marked"

interface MarkdownAction {
  format: string;
  icon: string;
  placeholder: string;
  line: boolean;
  wrapper: (text: string) => string;
}

const placeholder = ref('Écrivez votre contenu en Markdown ici...');
const markdownEditor = ref<HTMLTextAreaElement | null>(null);
const content = ref<string>(`## 😲 md-editor-v3

Markdown Editor for Vue3, developed in JSX and TypeScript, supports different themes, and beautifies content using Prettier.

### 🤖 Base

**bold**, *italic*, ~~line-through~~, \`inline code\`, [link](https://github.com/imzbf)

> quote: I Have a Dream

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

- [ ] Friday
- [ ] Saturday
- [x] Sunday
`);
const previewContent = ref("");

const preview = ref(false);

const markdownToolbar = ref<HTMLElement | null>(null);

const formatActions: Record<string, MarkdownAction> = {
  bold: {
    format: 'bold',
    icon: 'bold',
    placeholder: 'texte en gras',
    wrapper: (text) => `**${text}**`,
    line: false,
  },
  italic: {
    format: 'italic',
    icon: 'italic',
    placeholder: 'texte en italique',
    wrapper: (text) => `*${text}*`,
    line: false,
  },
  strikethrough: {
    format: 'strikethrough',
    icon: 'strikethrough',
    placeholder: 'texte barré',
    wrapper: (text) => `~~${text}~~`,
    line: false,
  },
  h1: {
    format: 'h1',
    icon: 'heading',
    placeholder: 'Titre de niveau 1',
    wrapper: (text) => `# ${text}`,
    line: true,
  },
  h2: {
    format: 'h2',
    icon: 'heading',
    placeholder: 'Titre de niveau 2',
    wrapper: (text) => `## ${text}`,
    line: true,
  },
  h3: {
    format: 'h3',
    icon: 'heading',
    placeholder: 'Titre de niveau 3',
    wrapper: (text) => `### ${text}`,
    line: true,
  },
  quote: {
    format: 'quote',
    icon: 'quote-right',
    placeholder: 'Citation',
    wrapper: (text) => `> ${text}`,
    line: false,
  },
  code: {
    format: 'code',
    icon: 'code',
    placeholder: 'code',
    wrapper: (text) => `\`${text}\``,
    line: false,
  },
  codeblock: {
    format: 'codeblock',
    icon: 'file-code',
    placeholder: 'code',
    wrapper: (text) => `\`\`\`\n${text}\n\`\`\``,
    line: false,
  },
  ul: {
    format: 'ul',
    icon: 'list-ul',
    placeholder: 'Élément de liste',
    wrapper: (text) => `- ${text}`,
    line: false,
  },
  ol: {
    format: 'ol',
    icon: 'list-ol',
    placeholder: 'Élément de liste',
    wrapper: (text, i = 1) => `${i}. ${text}`,
    line: false,
  },
  task: {
    format: 'task',
    icon: 'tasks',
    placeholder: 'Tâche à faire',
    wrapper: (text) => `- [ ] ${text}`,
    line: false,
  },
  link: {
    format: 'link',
    icon: 'link',
    placeholder: 'Texte du lien',
    wrapper: (text) => `[${text}](https://example.com)`,
    line: false,
  },
  image: {
    format: 'image',
    icon: 'image',
    placeholder: "Description de l'image",
    wrapper: () => "![Description de l'image](https://example.com/image.jpg)",
    line: false,
  },
  table: {
    format: 'table',
    icon: 'table',
    placeholder: '',
    wrapper: () =>
      '| En-tête 1 | En-tête 2 | En-tête 3 |\n| --------- | --------- | --------- |\n| Cellule 1 | Cellule 2 | Cellule 3 |',
    line: false,
  },
  hr: { format: 'hr', icon: 'minus', placeholder: '', wrapper: () => '\n\n---\n\n', line: false },
};



//methods
const insertText = (action: MarkdownAction): void => {
  if (!markdownEditor.value) return; // Vérifie si l'élément textarea existe

  const textareaInfo = getTextareaInfo(markdownEditor.value);

  // Récupération du placeholder de l'action
  const placeholder = action.placeholder;

  // Récupération du texte sélectionné
  const selectedText = textareaInfo.value.substring(textareaInfo.start, textareaInfo.end);

  let newText = '';
  let newCursorPos = 0;

  if (action.line) {
    // Pour les actions qui s'appliquent à la ligne entière (comme les titres)
    const lineStart = textareaInfo.value.lastIndexOf('\n', textareaInfo.start - 1) + 1;
    const lineEnd = textareaInfo.value.indexOf('\n', textareaInfo.start);
    const endPos = lineEnd === -1 ? textareaInfo.value.length : lineEnd;

    const currentLine = textareaInfo.value.substring(lineStart, endPos);
    // Enlever tout formatage de titre existant
    const cleanLine = currentLine.replace(/^#+\s/, '');

    // Appliquer le nouveau formatage
    const wrappedLine = action.wrapper(cleanLine);

    // Construire le nouveau texte
    newText =
      textareaInfo.value.substring(0, lineStart) +
      wrappedLine +
      textareaInfo.value.substring(endPos);

    // Positionner le curseur à la fin de la ligne formatée
    newCursorPos = lineStart + wrappedLine.length;
  } else {
    // Pour les actions qui s'appliquent au texte sélectionné
    const textToWrap = selectedText.length > 0 ? selectedText : placeholder;
    const wrappedText = action.wrapper(textToWrap);

    // Construire le nouveau texte
    newText = textareaInfo.before + wrappedText + textareaInfo.after;

    // Positionner le curseur après le texte inséré
    newCursorPos = textareaInfo.start + wrappedText.length;

    // Si un placeholder a été inséré, le sélectionner pour faciliter son remplacement
    if (selectedText.length === 0 && placeholder) {
      setTimeout(() => {
        markdownEditor.value!.selectionStart =
          textareaInfo.start + wrappedText.indexOf(placeholder);
        markdownEditor.value!.selectionEnd =
          textareaInfo.start + wrappedText.indexOf(placeholder) + placeholder.length;
      }, 0);
    }
  }

  // Mettre à jour le contenu
  content.value = newText;

  // Mettre le focus sur l'éditeur
  setTimeout(() => {
    markdownEditor.value!.focus();
    // Si nous n'avons pas sélectionné un placeholder, placer le curseur à la bonne position
    if (!(selectedText.length === 0 && placeholder && !action.line)) {
      markdownEditor.value!.selectionStart = newCursorPos;
      markdownEditor.value!.selectionEnd = newCursorPos;
    }
  }, 0);
};

const getTextareaInfo = (textarea: HTMLTextAreaElement) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

  // Get the complete line where cursor is located
  const lines = value.substring(0, start).split('\n');
  const currentLineNumber = lines.length - 1;
  const currentLineStart = value.lastIndexOf('\n', start - 1) + 1;
  const currentLineEnd = value.indexOf('\n', start);
  const currentLine = value.substring(
    currentLineStart,
    currentLineEnd === -1 ? undefined : currentLineEnd
  );

  const before = value.substring(0, start);
  const after = value.substring(end);

  return {
    textarea,
    start,
    end,
    value,
    currentLine,
    currentLineNumber,
    before,
    after,
  };
};

const handleToolbarClick = (event: MouseEvent) => {
  if (markdownToolbar.value) {
    const target = event.target as HTMLElement;
    const button = target.closest('button');
    if (button) {
      const format = button.getAttribute('data-format');
      if (!format || !(format in formatActions)) {
        preview.value = !preview.value;

        // Mettre à jour le contenu d'aperçu lorsque preview est activé
        if (preview.value) {
          previewContent.value = marked.parse(content.value) as string;
          const previewElement = document.getElementById('markdown-preview');
          if (previewElement) {
            previewElement.innerHTML = previewContent.value;
          }
        }

        return;
      } else {
        if (preview.value) return;
        const action = formatActions[format];
        insertText(action);
      }
    }
  }
};
const getIcon = (format: string): string => {
  const icons: Record<string, string> = {
    bold: 'bold',
    italic: 'italic',
    strikethrough: 'strikethrough',
    h1: 'heading',
    h2: 'heading',
    h3: 'heading',
    quote: 'quote-right',
    code: 'code',
    codeblock: 'file-code',
    ul: 'list-ul',
    ol: 'list-ol',
    task: 'tasks',
    link: 'link',
    image: 'image',
    table: 'table',
    hr: 'minus',
    preview: 'eye',
  };
  return icons[format] || 'question';
};

onMounted(() => {
  if (markdownEditor.value) {
    markdownEditor.value.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '    ');
      }
    });
  }
});
</script>
