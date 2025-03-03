// useMarkdownEditor.ts
import { ref, computed, onMounted, Ref } from 'vue';
import { marked } from 'marked';

interface MarkdownAction {
  format: string;
  placeholder: string;
  line: boolean;
  // Le paramètre optionnel permet, par exemple, d'indiquer l'index pour les listes ordonnées
  wrapper: (text: string, i?: number) => string;
}

export function useMarkdownEditor(content: Ref<string | null>) {
  // Références et état réactif
  const placeholder = ref('Écrivez votre contenu en Markdown ici...');
  const markdownEditor = ref<HTMLTextAreaElement | null>(null);
  const markdownToolbar = ref<HTMLElement | null>(null);
  const preview = ref(false);

  // Rendu du contenu en Markdown en mode aperçu
  const renderedContent = computed(() => {
    return preview.value ? marked.parse(content.value ?? '') : '';
  });

  // Définition des actions de formatage
  const formatActions: Record<string, MarkdownAction> = {
    bold: {
      format: 'bold',
      placeholder: 'texte en gras',
      wrapper: (text) => `**${text}**`,
      line: false,
    },
    italic: {
      format: 'italic',
      placeholder: 'texte en italique',
      wrapper: (text) => `*${text}*`,
      line: false,
    },
    strikethrough: {
      format: 'strikethrough',
      placeholder: 'texte barré',
      wrapper: (text) => `~~${text}~~`,
      line: false,
    },
    h1: {
      format: 'h1',
      placeholder: 'Titre de niveau 1',
      wrapper: (text) => `# ${text}`,
      line: true,
    },
    h2: {
      format: 'h2',
      placeholder: 'Titre de niveau 2',
      wrapper: (text) => `## ${text}`,
      line: true,
    },
    h3: {
      format: 'h3',
      placeholder: 'Titre de niveau 3',
      wrapper: (text) => `### ${text}`,
      line: true,
    },
    quote: {
      format: 'quote',
      placeholder: 'Citation',
      wrapper: (text) => `> ${text}`,
      line: true,
    },
    code: {
      format: 'code',
      placeholder: 'code',
      wrapper: (text) => `\`${text}\``,
      line: false,
    },
    codeblock: {
      format: 'codeblock',
      placeholder: 'code',
      wrapper: (text) => `\`\`\`\n${text}\n\`\`\``,
      line: false,
    },
    ul: {
      format: 'ul',
      placeholder: 'Élément de liste',
      wrapper: (text) => `- ${text}`,
      line: true,
    },
    ol: {
      format: 'ol',
      placeholder: 'Élément de liste',
      wrapper: (text, i = 1) => `${i}. ${text}`,
      line: true,
    },
    task: {
      format: 'task',
      placeholder: 'Tâche à faire',
      wrapper: (text) => `- [ ] ${text}`,
      line: true,
    },
    link: {
      format: 'link',
      placeholder: 'Texte du lien',
      wrapper: (text) => `[${text}](https://example.com)`,
      line: false,
    },
    image: {
      format: 'image',
      placeholder: "Description de l'image",
      wrapper: () => "![Description de l'image](https://example.com/image.jpg)",
      line: false,
    },
    table: {
      format: 'table',
      placeholder: 'Tableau',
      wrapper: () =>
        '| En-tête 1 | En-tête 2 | En-tête 3 |\n| --------- | --------- | --------- |\n| Cellule 1 | Cellule 2 | Cellule 3 |',
      line: true,
    },
    hr: {
      format: 'hr',
      placeholder: 'Ligne horizontale',
      wrapper: () => '\n\n---\n\n',
      line: true,
    },
  };

  // Map des icônes pour chaque format
  const iconMap: Record<string, string> = {
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
  } as const;

  // Récupère l'icône associée à un format
  function getIcon(format: keyof typeof iconMap): string {
    return iconMap[format] || 'question';
  }

  // Récupère les informations (position, sélection, etc.) sur le textarea
  function getTextareaInfo(textarea: HTMLTextAreaElement) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    // Détermine le début de la ligne courante
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = value.indexOf('\n', start);
    const currentLine = value.substring(lineStart, lineEnd === -1 ? value.length : lineEnd);

    return {
      start,
      end,
      value,
      selectedText: value.substring(start, end),
      lineStart,
      lineEnd: lineEnd === -1 ? value.length : lineEnd,
      currentLine,
    };
  }

  // Insère le texte formaté dans le contenu en préservant l'historique d'édition
  function insertText(actionKey: string): void {
    if (!markdownEditor.value || preview.value) return;

    const textarea = markdownEditor.value;
    const action = formatActions[actionKey];
    if (!action) return;

    textarea.focus();
    const info = getTextareaInfo(textarea);
    let newText: string;
    let selStart: number, selEnd: number;

    if (action.line) {
      // Pour les actions s'appliquant à une ligne entière (titres, listes, etc.)
      textarea.selectionStart = info.lineStart;
      textarea.selectionEnd = info.lineEnd;

      let cleanedText = info.currentLine;
      if (actionKey.startsWith('h')) {
        cleanedText = cleanedText.replace(/^#+\s/, '');
      } else if (['ul', 'ol', 'task'].includes(actionKey)) {
        cleanedText = cleanedText.replace(/^(\d+\.|-|\[[ x]\])\s+/, '');
      } else if (actionKey === 'quote') {
        cleanedText = cleanedText.replace(/^>\s*/, '');
      }

      newText = action.wrapper(cleanedText);
      selStart = selEnd = info.lineStart + newText.length;
    } else {
      // Pour les actions appliquées sur le texte sélectionné
      const textToWrap = info.selectedText || action.placeholder;
      newText = action.wrapper(textToWrap);

      if (info.selectedText) {
        selStart = selEnd = info.start + newText.length;
      } else {
        // Si aucun texte n'est sélectionné, sélectionne le placeholder inséré
        const placeholderIndex = newText.indexOf(action.placeholder);
        if (placeholderIndex >= 0) {
          selStart = info.start + placeholderIndex;
          selEnd = selStart + action.placeholder.length;
        } else {
          selStart = selEnd = info.start + newText.length;
        }
      }
    }

    // Insertion en utilisant execCommand pour préserver l'historique d'édition
    document.execCommand('insertText', false, newText);

    // Mise à jour asynchrone de la sélection
    if (selStart !== undefined && selEnd !== undefined) {
      setTimeout(() => {
        textarea.selectionStart = selStart;
        textarea.selectionEnd = selEnd;
      }, 0);
    }
  }

  // Gère les clics sur la barre d'outils
  function handleToolbarClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const button = target.closest('button');
    if (!button) return;

    const format = button.getAttribute('data-format');
    if (!format) return;

    if (format === 'preview') {
      preview.value = !preview.value;
      return;
    }

    insertText(format);
  }

  // Gère les raccourcis clavier (Ctrl+B, Ctrl+I, etc.)
  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '    ');
      return;
    }

    if (e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          insertText('bold');
          break;
        case 'i':
          e.preventDefault();
          insertText('italic');
          break;
        case '`':
          e.preventDefault();
          insertText('code');
          break;
        case 'q':
          e.preventDefault();
          insertText('quote');
          break;
        case 'h':
          e.preventDefault();
          insertText(e.shiftKey ? 'h1' : 'h2');
          break;
        case 'l':
          e.preventDefault();
          insertText(e.shiftKey ? 'ol' : 'ul');
          break;
        case 'k':
          e.preventDefault();
          insertText('link');
          break;
      }
    }
  }

  // Lors du montage, focus sur l'éditeur
  onMounted(() => {
    if (markdownEditor.value) {
      markdownEditor.value.focus();
    }
  });

  return {
    placeholder,
    markdownEditor,
    markdownToolbar,
    preview,
    content,
    renderedContent,
    formatActions,
    getIcon,
    insertText,
    handleToolbarClick,
    handleKeyDown,
  };
}
