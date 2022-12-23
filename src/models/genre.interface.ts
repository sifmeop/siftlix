export interface IGenres {
  id: number
  name: string
}

export interface IGenresResponse<T> {
  genres: IGenres[]
}
