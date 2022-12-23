import { ICast } from 'models/cast.interface'

export const getActors = (cast: ICast[]) => {
  const actors: string[] = []
  cast.forEach((actor) => {
    actors.push(actor.name)
  })
  return actors.join(', ')
}
