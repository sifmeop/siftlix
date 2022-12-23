export interface ISearchResponse<T> {
  page: number
  results: ISearch[]
  total_results: number
  total_pages: number
}

export interface ISearch {
  id: number
  media_type: string
  poster_path: string | null
  vote_average: number
  name: string
  title: string
  release_date: string
  first_air_date: string
  vote_count: number
}
