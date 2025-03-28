export class Data<T extends { id: number | string; [key: string]: any }> {
	/* C'est une valeur par défaut pour la propriété id. */
	protected id: string = "id";

	/**
	 * La fonction constructeur prend un paramètre facultatif de type T[], et si aucun paramètre n'est
	 * passé, il définit la propriété _items sur un tableau vide.
	 * @param {T[]} _items - T[] = []
	 */
	constructor(protected _items: T[] = []) {}

	/**
	 * La fonction add prend un élément de type T et l'ajoute au tableau des éléments de type T
	 * @param {T} item - T - L'élément à ajouter à la collection.
	 */
	add(item: T) {
		this._items.push(item);
	}

	/**
	 * La fonction définit les éléments d'une classe en parcourant chaque élément et en l'ajoutant ou en le mettant à jour..
	 * @param {T[]} items - Un tableau d'éléments de type T.
	 */
	set(items: T[]) {
		items.forEach((item) => this.addOrUpdate(item));
	}

	/**
	 * Si l'élément à l'index i existe, alors mettez à jour l'élément à l'index i avec le nouvel élément
	 * @param {number} i - number - l'index de l'élément à mettre à jour
	 * @param item - Partielle<T>
	 */
	save(i: number, item: Partial<T>) {
		if (this._items[i]) {
			this._items[i] = {
				...this._items[i],
				...item,
			};
		}
	}

	/**
	 * Si l'index est trouvé, enregistrez l'élément à cet index.
	 * @param {number | string} index - nombre | string - L'index de l'élément à mettre à jour.
	 * @param item - Partielle<T>
	 */
	update(index: number | string, item: Partial<T>) {
		const i = this.findIndex(index);
		if (i !== null) {
			this.save(i, item);
		}
	}

	/**
	 * Si l'élément existe, mettez-le à jour, sinon ajoutez-le
	 * @param {T} item - T - l'élément à ajouter ou à mettre à jour
	 */
	addOrUpdate(item: T) {
		const i = this.findIndex(item[this.id]);
		if (i !== null) {
			this.save(i, item);
		} else {
			this.add(item);
		}
	}

	/**
	 * Il supprime un élément du tableau en trouvant l'index de l'élément, puis en le séparant du
	 * tableau.
	 * @param {string | number} id - chaîne | number - L'identifiant de l'élément à supprimer.
	 */
	delete(id: string | number): boolean {
		const index = this.findIndex(id);
		if (index != null) {
			this._items.splice(index, 1);
			return true;
		}
		return false;
	}

	/**
	 * Si l'index de l'élément avec la clé et la valeur données n'est pas nul, supprimez l'élément à cet
	 * index du tableau.
	 * @param {string} key - La clé de l'objet que vous souhaitez rechercher.
	 * @param {string | number | boolean} value - chaîne | nombre | booléen
	 */
	deleteBy(key: string, value: string | number | boolean) {
		const index = this.findIndexBy(key, value);
		if (index != null) {
			this._items.splice(index, 1);
		}
	}

	/**
	 * Il efface le tableau.
	 */
	clear() {
		this._items = [];
	}

	/**
	 * Si l'id est une chaîne, la fonction renverra le premier élément du tableau où la propriété id est
	 * égale au paramètre id. Si l'id est un nombre, la fonction renverra le premier élément du tableau
	 * où la propriété id est égale au paramètre id. Si l'identifiant n'est ni une chaîne ni un nombre,
	 * alors la fonction renverra null
	 * @param {string | number} id - chaîne | number - L'identifiant de l'élément que vous souhaitez
	 * rechercher.
	 * @returns Le premier élément du tableau qui correspond à l'ID.
	 */
	find(id: string | number): T | null {
		return this._items.find((i) => i[this.id] === id) ?? null;
	}

	/**
	 * Il renvoie le premier élément du tableau qui correspond à la valeur de la clé
	 * @param {string | number} value - La valeur à rechercher.
	 * @param {string} key - La clé de recherche.
	 * @returns Le premier élément du tableau qui correspond à la valeur et à la clé.
	 */
	findBy(key: string, value: string | number): T | null {
		return this._items.find((i) => i[key] === value) ?? null;
	}

	/**
	 * Si l'index de l'élément avec l'identifiant donné n'est pas -1, retourne l'index, sinon retourne
	 * null
	 * @param {string | number} id - chaîne | number - L'identifiant de l'élément à rechercher.
	 * @returns L'index de l'élément dans le tableau ou null s'il n'est pas trouvé.
	 */
	findIndex(id: string | number): number | null {
		const index = this._items.findIndex((i) => i[this.id] === id);
		return index === -1 ? null : index;
	}

	/**
	 * Trouver l'index d'un élément dans un tableau par une clé et une valeur.
	 * @param {string} key - La clé de l'objet dont vous voulez trouver l'index.
	 * @param {string | number | boolean} value - La valeur à rechercher.
	 * @returns Index de l'élément dans le tableau qui correspond à la clé et à la valeur.
	 */
	findIndexBy(key: string, value: string | number | boolean): number | null {
		const index = this._items.findIndex((i) => i[key] === value);
		return index === -1 ? null : index;
	}

	/**
	 * La fonction renvoie un tableau de type T
	 * @returns Un tableau de type T.
	 */
	get(): T[] {
		return this._items;
	}

	/**
	 * Il renvoie un tableau de tous les éléments de la collection.
	 * @returns Un tableau de type T.
	 */
	all(): T[] {
		return this._items;
	}

	/**
	 * Si le premier élément du tableau n'est pas nul, retournez-le, sinon retournez null
	 * @returns Le premier élément du tableau ou null si le tableau est vide.
	 */
	first(): T | null {
		return this._items[0] ?? null;
	}

	/**
	 * Si le tableau est vide, retourne null, sinon retourne le dernier élément du tableau
	 * @returns Le dernier élément du tableau.
	 */
	last(): T | null {
		return this._items[this._items.length - 1] ?? null;
	}

	/**
	 * Il renvoie le nombre d'éléments du tableau.
	 * @returns Le nombre d'éléments dans le tableau.
	 */
	count(): number {
		return this._items.length;
	}
}
