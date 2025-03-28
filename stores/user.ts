import { defineStore } from "pinia";

interface UserState {
	isAuthenticated: boolean;
	user: {
		id: string | null;
		username: string | null;
		email: string | null;
	} | null;
}

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		isAuthenticated: false,
		user: null,
	}),

	getters: {
		// Get user information
		getUserInfo: (state) => state.user,
		// Check if user is authenticated
		getIsAuthenticated: (state) => state.isAuthenticated,
	},

	actions: {
		// Login action
		login(userData: { username: string; email: string; id: string }) {
			this.isAuthenticated = true;
			this.user = userData;
		},

		// Logout action
		logout() {
			this.isAuthenticated = false;
			this.user = null;
		},

		// Update user information
		updateUserInfo(userData: Partial<UserState["user"]>) {
			if (this.user) {
				this.user = { ...this.user, ...userData };
			}
		},
	},
});
