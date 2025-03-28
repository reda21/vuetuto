// types/Data.ts

export interface DataWithMeta<T> {
	data: T[];
	meta: Meta;
	links: Links;
}

export interface Data<T> {
	data: T;
}

export interface Links {
	first: string;
	next: string;
	last: string;
}

export interface Meta {
	count: number;
}
