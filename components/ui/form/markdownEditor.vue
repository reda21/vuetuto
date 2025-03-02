<template>
  <div class="divClass">
    <button
      type="button"
      data-format="bold"
      class="rounded px-2 py-1 text-gray-300 hover:bg-gray-800 hover:text-white"
      title="Gras"
    >
      <UiIcon iconFamily="fa6-solid" icon="bold" />
    </button>
  </div>
  <!-- Éditeur -->
  <textarea
    id="markdown"
    name="markdown"
    rows="8"
    class="focus:ring-blog-accent w-full rounded-b-lg border border-t-0 border-gray-700 bg-gray-800 px-4 py-2 font-mono text-white focus:ring-2 focus:outline-none"
    placeholder="Écrivez votre contenu en Markdown ici..."
  />
</template>

<script lang="ts" setup>
const divClass =
  'flex flex-wrap items-center bg-gray-900 border border-gray-700 border-b-0 rounded-t-lg px-3 py-2 gap-1';
</script>
