import { IGenres } from 'models/genre.interface'

export const getGenres = (genres: IGenres[], MOVIE_GENRES: IGenres[] | undefined) => {
  const result: string[] = []
  try {
    MOVIE_GENRES?.forEach((movieGenre) => {
      genres.forEach((genre) => {
        if (genre.id === movieGenre.id) {
          result.push(movieGenre.name[0].toUpperCase() + movieGenre.name.slice(1))
        }
      })
    })
  } catch (e: any) {
    console.log(e.message)
  }
  return result.join(', ')
}
