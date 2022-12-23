import { NextPage } from 'next'
import { useGetPopularQuery } from 'store/api/theMovieDB'
import Loader from 'components/UI/Loader'
import TabsSelection from 'components/TabsSelection'
import Title from 'components/Title'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

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
