
export interface FinanceCreate {
    budget: number
    actor_salary: number
    crew_salary: number
    advertising_cost: number
    editing_cost: number
    equipment_cost: number
}

export interface FinanceUpdate {
    budget?: number
    actor_salary?: number
    crew_salary?: number
    advertising_cost?: number
    editing_cost?: number
    equipment_cost?: number
}