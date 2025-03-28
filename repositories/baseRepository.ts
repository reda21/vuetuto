import type { Data, DataWithMeta } from "@/types/repository"; // Importer la structure Data depuis un fichier partagé.

export default class BaseRepository<T> {
	protected resource: string;

	constructor(resource: string) {
		this.resource = resource;
	}

	async getAll(params: Record<string, any> = {}): Promise<T[]> {
		return await $fetch<T[]>(this.resource, { params });
	}

	async getById(id: string | number): Promise<Data<T>> {
		return await $fetch<Data<T>>(`${this.resource}/${id}`);
	}

	async create(data: Partial<T>): Promise<T> {
		return await $fetch<T>(this.resource, {
			method: "POST",
			body: data,
		});
	}

	async update(id: string | number, data: Partial<T>): Promise<T> {
		return await $fetch<T>(`${this.resource}/${id}`, {
			method: "PUT",
			body: data,
		});
	}

	async delete(id: string | number): Promise<void> {
		await $fetch(`${this.resource}/${id}`, {
			method: "DELETE",
		});
	}

	async getAllWithPagination(
		params: Record<string, any> = {},
	): Promise<DataWithMeta<T>> {
		return await $fetch<DataWithMeta<T>>(this.resource, { params });
	}
}
