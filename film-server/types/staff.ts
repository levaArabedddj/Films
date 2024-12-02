
export interface StaffAssign{
    staffId: number
}

interface Staff {
    full_name: string
    salary_per_hour: number
}


export interface ActorCreate extends Staff {
    rating: number
}

export interface CrewMemberCreate extends Staff {}
