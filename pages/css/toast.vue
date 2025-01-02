<template>
  <div class="flex flex-wrap gap-2">
    <Button label="Show" @click="show()" />
    <Button label="Success" severity="success" @click="showSuccess" />
    <Button label="Info" severity="info" @click="showInfo" />
    <Button label="Warn" severity="warn" @click="showWarn" />
    <Button label="Error" severity="danger" @click="showError" />
    <Button label="Secondary" severity="secondary" @click="showSecondary" />
    <Button label="Contrast" severity="contrast" @click="showContrast" />
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

const show = () => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Message Content",
    life: 3000,
  });
};

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Success Message",
    detail: "Message Content",
    life: 3000,
  });
};

const showInfo = () => {
  toast.add({
    severity: "info",
    summary: "Info Message",
    detail: "Message Content",
    life: 3000,
  });
};

const showWarn = () => {
  toast.add({
    severity: "warn",
    summary: "Warn Message",
    detail: "Message Content",
    life: 3000,
  });
};

const showError = () => {
  toast.add({
    severity: "error",
    summary: "Error Message",
    detail: "Message Content",
    life: 3000,
  });
};

const showSecondary = () => {
  toast.add({
    severity: "secondary",
    summary: "Secondary Message",
    detail: "Message Content",
    life: 3000,
  });
};

const showContrast = () => {
  toast.add({
    severity: "contrast",
    summary: "Contrast Message",
    detail: "Message Content",
    life: 3000,
  });
};

console.info(toast);
</script>
