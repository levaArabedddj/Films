export interface Film {
	id: number;
	title: string;
	description: string;
	genre: string;
	userId: number;
	scriptId: number | null;
	financeId: number | null;
	createdAt: string;
}

export interface FullFilmResponse {
	id: number;
	title: string;
	description: string;
	genre: string;
	userId: number;
	scriptId: number | null;
	financeId: number | null;
	createdAt: string;
	shootingDay: ShootingDay[];
	finance: Finance | null;
	script: Script | null;
	actors: Actor[];
	crew_members: CrewMember[];
}

export interface ShootingDay {
	id: number;
	shooting_day: string;
	shooting_time: number;
	shooting_location: string;
	estimated_duration_hours: number;
	filmId: number;
}
export interface ShootingDayCreate {
	shooting_day: string;
	shooting_time: number;
	shooting_location: string;
	estimated_duration_hours: number;
}

export interface Finance {
	id: number;
	budget: number;
	actor_salary: number;
	crew_salary: number;
	advertising_cost: number;
	editing_cost: number;
	equipment_cost: number;
	filmId?: number;
}

export interface FinanceCreate {
	budget: number;
	actor_salary: number;
	crew_salary: number;
	advertising_cost: number;
	editing_cost: number;
	equipment_cost: number;
}

export interface ScriptCreate {
	content: string;
}
export interface Script {
	id: number;
	content: string;
	filmId?: number;
}

export interface Actor {
	id: number;
	full_name: string;
	rating: number;
	salary_per_hour: number;
}

export interface CrewMember {
	id: number;
	full_name: string;
	salary_per_hour: number;
}

export interface ActorCreate {
	full_name: string;
	rating: number;
	salary_per_hour: number;
}

export interface CrewMemberCreate {
	full_name: string;
	salary_per_hour: number;
}
