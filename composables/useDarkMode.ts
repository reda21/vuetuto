// composables/useDarkMode.ts
const darkModelOption = {
  selector: "body",
  attribute: "color-scheme",
  valueDark: "dark",
  valueLight: "light",
};

export const useDarkMode = () => {
  // Gestion du mode sombre avec VueUse
  const isDark = useDark();

  // Icône dynamique en fonction de l'état
  const icon = computed(() =>
    isDark.value ? "heroicons:sun-20-solid" : "heroicons:moon-20-solid"
  );

  // Classes CSS dynamiques pour l'icône
  const iconClass =
    "w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400";

  // Fonction pour basculer le mode sombre
  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark,
    toggleDark,
    icon,
    iconClass,
  };
};
