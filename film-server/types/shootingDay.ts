export interface ShootingDayCreate {
    shooting_day: Date
    shooting_time: number,
    shooting_location: string,
    estimated_duration_hours: 5
}


export interface ShootingDayUpdate {
    shooting_day?: Date
    shooting_time?: number,
    shooting_location?: string,
    estimated_duration_hours?: 5
}