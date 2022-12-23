import { NextPage } from 'next'
import { IMovieCard } from 'models/movie.interface'
import { useRouter } from 'next/router'
import { useGetDetailsMovieQuery } from 'store/api/theMovieDB'
import MovieID from 'screens/movieId'
import Loader from 'components/UI/Loader'
import Meta from 'utils/Meta'
import Title from 'components/Title'

interface IProps {
  movie: IMovieCard
}

const Index: NextPage<IProps> = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useGetDetailsMovieQuery({ id, lang: router.locale })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error)
  }

  return data ? (
    <>
      <Meta title={data.title} description={data.overview} />
      <MovieID movie={data} />
    </>
  ) : (
    <Title title='Error Movie ID' />
  )
}

export default Index
