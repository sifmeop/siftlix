import { NextPage } from 'next'
import { useGetUpcomingMovieQuery } from 'store/api/theMovieDB'
import Loader from 'components/UI/Loader'
import MoviesList from 'components/MoviesList'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const Upcoming: NextPage = () => {
  const { t } = useTranslation('global')
  const router = useRouter()
  const { data, isLoading, error } = useGetUpcomingMovieQuery(router.locale)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'ComingSoon error')
  }

  return <MoviesList title={t('upcoming')} data={data} />
}

export default Upcoming
