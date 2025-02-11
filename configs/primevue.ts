export const ConfigCss = {
  primevue: {
    options: {
      theme: "none",
      ripple: true,
    },
    components: {
      include: [
        "Button",
        "Drawer",
        "Menu",
        "AutoComplete",
        "Form",
        "Toast",
        "CascadeSelect",
      ],
    },
  },
  css: ["@/assets/styles/tailwind.css", "primeicons/primeicons.css"],
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
};
