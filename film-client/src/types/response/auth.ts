export interface User {
	id: number;
	name: string;
	surname: string;
	email: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}
