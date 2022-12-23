import { IGenres } from 'models/genre.interface'

export interface ICreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface ILastEpisodeToAir {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
}

export interface ISeason {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

export interface IDetails {
  //movie
  backdrop_path: string
  poster_path: string
  overview: string
  release_date: string
  budget: number
  genres: IGenres[]
  id: number
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  vote_average: number
  vote_count: number
  //tv
  created_by: ICreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  homepage: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: ILastEpisodeToAir
  name: string
  next_episode_to_air?: any
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  popularity: number
  seasons: ISeason[]
  type: string
}
