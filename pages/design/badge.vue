<template>
  <div>
    <h1 class="mb-4 text-gray-900">VBadge</h1>
    <div class="card flex flex-wrap justify-center gap-2">
      <VBadge value="2" />
      <VBadge value="6" severity="secondary" />
      <VBadge value="8" severity="success" />
      <VBadge value="4" severity="info" />
      <VBadge value="9" severity="warn" />
      <VBadge value="3" severity="danger" />
      <VBadge value="5" severity="contrast" />
    </div>
    <div class="flex justify-center gap-2 mb-3">
      <button class="btn btn-neutral">Neutral</button>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-info">Info</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-error">Error</button>
    </div>
    <div class="flex justify-center gap-2 mb-3">
      <button class="btn btn-outline">Default</button>
      <button class="btn btn-outline btn-primary">Primary</button>
      <button class="btn btn-outline btn-secondary">Secondary</button>
      <button class="btn btn-outline btn-accent">Accent</button>
      <button class="btn btn-outline btn-info">Info</button>
      <button class="btn btn-outline btn-success">Success</button>
      <button class="btn btn-outline btn-warning">Warning</button>
      <button class="btn btn-outline btn-error">Error</button>
    </div>
    <div class="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are title and
          actions parts
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
