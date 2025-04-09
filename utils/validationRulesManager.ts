// src/composables/ValidationRulesManager.ts

/**
 * Gestionnaire de règles de validation pour ValidatorJS (@chantouchsek/validatorjs).
 * Permet d'initialiser un schéma global ou d'ajouter/retirer des règles champ par champ.
 */
export class ValidationRulesManager {
  private rules: Record<string, string[]>;

  constructor(initialRules: Record<string, string | string[]> = {}) {
    this.rules = {};
    this.setRules(initialRules);
  }

  /**
   * Remplace entièrement le schéma de validation.
   */
  setRules(rules: Record<string, string | string[]>): void {
    this.rules = {};
    Object.entries(rules).forEach(([field, rule]) => {
      this.rules[field] = Array.isArray(rule) ? [...rule] : [rule];
    });
  }

  /**
   * Récupère le schéma complet sous forme d'objet prêt pour ValidatorJS.
   */
  getRules(): Record<string, string[]> {
    return { ...this.rules };
  }

  /**
   * Gets a specific rule for a field.
   * Returns undefined if the field or rule doesn't exist.
   */
  getRule(field: string, ruleToFind: string): string | undefined {
    if (!this.rules[field]) return undefined;
    return this.rules[field].find((rule) => rule === ruleToFind);
  }

  /**
   * Ajoute une ou plusieurs règles pour un champ spécifique.
   */
  addRule(field: string, rule: string | string[]): void {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    const newRules = Array.isArray(rule) ? rule : [rule];
    newRules.forEach((newRule) => {
      if (!this.rules[field].includes(newRule)) {
        this.rules[field].push(newRule);
      }
    });
  }

  /**
   * Retire une règle précise d'un champ.
   */
  removeRule(field: string, rule: string): void {
    if (!this.rules[field]) return;
    this.rules[field] = this.rules[field].filter((r) => r !== rule);
    if (this.rules[field].length === 0) {
      delete this.rules[field];
    }
  }

  /**
   * Récupère les règles d'un champ.
   */
  getFieldRules(field: string): string[] {
    return this.rules[field] || [];
  }
}
