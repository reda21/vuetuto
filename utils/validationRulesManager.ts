export class ValidationRulesManager {
  private rules: Record<string, string[]>;

  constructor(initialRules: Record<string, string | string[]> = {}) {
    this.rules = {};
    this.setRules(initialRules);
  }

  /**
   * Transforme n'importe quelle règle (string ou array) en tableau sans doublons, avec split par '|'.
   */
  private normalizeRules(rule: string | string[]): string[] {
    const ruleArray = Array.isArray(rule) ? rule : [rule];
    const flattened = ruleArray.flatMap((r) => (typeof r === 'string' ? r.split('|') : []));
    // Élimine les doublons
    return [...new Set(flattened.map((r) => r.trim()).filter(Boolean))];
  }

  /**
   * Remplace entièrement le schéma de validation.
   */
  setRules(rules: Record<string, string | string[]>): void {
    this.rules = {};
    Object.entries(rules).forEach(([field, rule]) => {
      this.rules[field] = this.normalizeRules(rule);
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
    const newRules = this.normalizeRules(rule);
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

  /**
   * Vérifie si le champ est une confirmation (_confirmation) et retourne le champ d'origine s'il est confirmé.
   */
  checkConfirmationField(field: string): string | false {
    if (field.endsWith('_confirmation')) {
      const baseField = field.slice(0, -13); // Remove '_confirmation' (13 characters)
      return this.rules[baseField]?.includes('confirmed') ? baseField : false;
    }
    return false;
  }

  /**
   * Checks if a field has a 'same' rule referencing another field
   * Returns the referenced field name if found, false otherwise
   */
  checkSameField(field: string): string | false {
    for (const [key, rules] of Object.entries(this.rules)) {      
      const sameRule = rules.find(rule => rule.startsWith('same:'));     
      if (sameRule && sameRule.slice(5) === field) {        
        return key;
      }
    }
    return false;
  }

  /**
   * Checks if a field has a 'required' validation rule
   * @param field The field name to check
   * @returns boolean indicating if the field is required
   */
  isRequired(field: string): boolean {
    return this.rules[field]?.includes('required') ?? false;
  }

  
}
