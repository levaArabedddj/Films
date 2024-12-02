export interface FilmCreate {
    title: string
    description: string
    genre: string
}


export interface FilmUpdate {
    title?: string
    description?: string
    genre?: string
}