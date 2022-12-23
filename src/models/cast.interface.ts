import { IMovieCard } from 'models/movie.interface'
export interface ICastResponse<T> {
  id: number
  cast: ICast[]
  crew: string
}

export interface ICast {
  id: number
  name: string
  profile_path: string
  character: string
}

export interface ICastResponseCard<T> {
  id: number
  cast: IMovieCard[]
  crew: string
}
