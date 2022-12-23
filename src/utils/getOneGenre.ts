import { IGenres } from '../models/genre.interface'

export const getOneGenre = (id: number, genres: IGenres[] | undefined): string => {
  let result: string = ''
  genres?.some((genre) => {
    if (genre.id === id) {
      result = genre.name[0].toUpperCase() + genre.name.slice(1)
    }
  })
  return result
}
