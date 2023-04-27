import TabsSelection from 'components/TabsSelection'
import Title from 'components/Title'
import Loader from 'components/UI/Loader'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useGetPopularQuery } from 'store/api/theMovieDB'

const Home: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('global')

  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError
  } = useGetPopularQuery({ media: 'movie', lang: router.locale })

  const { data: tv, isLoading: tvIsLoading, error: tvError } = useGetPopularQuery({ media: 'tv', lang: router.locale })

  if (moviesIsLoading || tvIsLoading) {
    return <Loader />
  }

  if (moviesError || tvError) {
    console.log(moviesError, tvError, 'Home error')
  }

  return (
    <>
      <Title title={t('popular')} />
      <TabsSelection keyMovie='Popular Movies' keyTV='Popular TV Series' movies={movies} tv={tv} />
    </>
  )
}

export default Home
