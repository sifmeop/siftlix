export interface IVideoResponse<T> {
  id: number
  results: IVideo[]
}

export interface IVideo {
  key: string
  type: string
  official: boolean
}
