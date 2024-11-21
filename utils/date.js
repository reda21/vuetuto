// Fonction pour formater une date
export function formatDate(date, locale = "fr-FR") {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
