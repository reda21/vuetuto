import { Data } from "./data";
import type { UserType } from "~/types/user";

/* User is a class that extends Data and has a method called pluckUsername that returns an array of
strings. */
export class User<
	T extends { id: number; username: string; [key: string]: any },
> extends Data<T> {
	/**
	 * It tUakes an array of objects, and returns an array of strings
	 * @returns An array of strings.
	 */
	pluckUsername(): string[] {
		return this._items.map((item) => item.username);
	}
}

export type { UserType };
