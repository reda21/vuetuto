/**
 * Type représentant une collection d'erreurs, où chaque clé correspond à un champ
 * et la valeur associée peut être une chaîne, un tableau ou tout autre type.
 */
export type ErrorType = Record<string, any | any[]>;

/**
 * Classe utilitaire pour la gestion des erreurs personnalisées sous forme réactive.
 * Permet d'ajouter, de récupérer, de supprimer et de manipuler des messages d'erreur
 * associés à des champs spécifiques.
 */
export class CustomError {
  private items: ErrorType;

  /**
   * Initialise une nouvelle instance de CustomError avec un objet réactif vide.
   */
  constructor() {
    this.items = ref({});
  }

  /**
   * Définit une erreur unique pour une clé donnée.
   * Si la valeur est une chaîne, elle est encapsulée dans un tableau.
   * @param key - Le nom du champ ou de la clé d'erreur.
   * @param value - Le message d'erreur ou le tableau de messages.
   */
  setOne(key: string, value: any): void {
    if (typeof value === 'string') this.items.value[key] = [value];
    else {
      this.items.value[key] = value;
    }
  }

  /**
   * Ajoute une erreur à une clé donnée. Si la clé existe déjà, la valeur est ajoutée au tableau.
   * @param key - Le nom du champ ou de la clé d'erreur.
   * @param value - Le message d'erreur ou le tableau de messages.
   */
  set(key: string, value: any | any[]): void {
    if (typeof value === 'string') {
      // Si la valeur est une chaîne de caractères, on l'ajoute à un tableau
      if (this.items.value[key]) {
        if (Array.isArray(this.items.value[key])) {
          this.items.value[key].push(value);
        } else {
          this.items.value[key] = [this.items.value[key], value];
        }
      } else {
        this.items.value[key] = [value];
      }
    } else {
      // Si la valeur est un tableau ou undefined, on l'assigne directement
      this.items.value[key] = value;
    }
  }

  /**
   * Remplace toutes les erreurs existantes par un nouvel ensemble d'erreurs.
   * Les valeurs non-tableaux sont converties en tableaux.
   * @param items - Un objet contenant les erreurs à définir.
   */
  setAll(items: ErrorType): void {
    this.clearAll();
    const _items: ErrorType = {};
    for (const key in items) {
      if (Array.isArray(items[key])) {
        _items[key] = items[key]; // Garde le tableau intact
      } else {
        _items[key] = [items[key]]; // Transforme une chaîne de caractères en un tableau contenant cette chaîne
      }
    }
    this.items.value = { ..._items };
  }

  /**
   * Récupère le tableau de messages d'erreur associé à une clé.
   * @param key - Le nom du champ ou de la clé d'erreur.
   * @returns Un tableau de messages d'erreur ou tout type selon la valeur stockée.
   */
  get<T = any>(key: string): T {
    return this.items.value[key];
  }

  /**
   * Vérifie si une erreur existe pour une clé donnée.
   * @param key - Le nom du champ ou de la clé d'erreur.
   * @returns true si une erreur existe, sinon false.
   */
  has(key: string): boolean {
    return key in this.items.value;
  }

  /**
   * Retourne toutes les erreurs sous forme d'objet.
   * @returns L'objet contenant toutes les erreurs, typé dynamiquement.
   */
  all<T = ErrorType>(): T {
    return this.items.value as T;
  }

  /**
   * Supprime l'erreur associée à une clé spécifique.
   * @param key - Le nom du champ ou de la clé d'erreur à supprimer.
   */
  clear(key: string): void {
    delete this.items.value[key];
  }

  /**
   * Supprime toutes les erreurs.
   */
  clearAll(): void {
    this.items.value = {};
  }

  /**
   * Supprime les erreurs associées à un ou plusieurs champs.
   * @param fields - Un champ ou un tableau de champs à supprimer.
   */
  clearWith(fields: string | string[]) {
    if (typeof fields === 'string') {
      this.clear(fields);
    } else if (Array.isArray(fields)) {
      fields.forEach((field) => this.clear(field));
    }
  }

  /**
   * Récupère le premier message d'erreur pour une clé donnée.
   * @param key - Le nom du champ ou de la clé d'erreur.
   * @returns Le premier message d'erreur ou null si aucun n'existe, typé dynamiquement.
   */
  first<T = any>(key: string): T | null {
    return this.has(key) ? this.get<T[]>(key)[0] : null;
  }
}
