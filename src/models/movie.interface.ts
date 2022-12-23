import { IGenres } from 'models/genre.interface'
export interface IMovieResponse<T> {
  page: number
  results: IMovieCard[]
  total_results: number
  total_pages: number
}

export interface IMovieCard {
  id: number
  poster_path: string | null
  title: string
  name: string
  vote_average: number
  genre_ids: number[]
  genres: IGenres[]
  first_air_date: string
  release_date: string
  overview: string
  backdrop_path: string
  vote_count: number
  rate: number
  desc: string
}
