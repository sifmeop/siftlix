import { NextPage } from 'next'
import { useGetTrendingQuery } from 'store/api/theMovieDB'
import Loader from 'components/UI/Loader'
import TabsSelection from 'components/TabsSelection'
import Title from 'components/Title'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const TrendingNow: NextPage = () => {
  const { t } = useTranslation('global')
  const router = useRouter()
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError
  } = useGetTrendingQuery({ media: 'movie', lang: router.locale })
  const { data: tv, isLoading: tvIsLoading, error: tvError } = useGetTrendingQuery({ media: 'tv', lang: router.locale })

  if (moviesIsLoading || tvIsLoading) {
    return <Loader />
  }

  if (moviesError || tvError) {
    console.log(moviesError, tvError, 'Home error')
  }

  return (
    <>
      <Title title={t('trending-now')} />
      <TabsSelection keyMovie='Trending now movies' keyTV='Trending now TV Series' movies={movies} tv={tv} />
    </>
  )
}

export default TrendingNow
