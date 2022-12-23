import Loader from 'components/UI/Loader'
import { NextPage } from 'next'
import { useGetPersonFilmographyQuery } from 'store/api/theMovieDB'
import SubTitle from 'components/SubTitle'
import { useRouter } from 'next/router'
import TabsSelection from 'components/TabsSelection'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  id: string
}

const Filmography: NextPage<IProps> = ({ id }) => {
  const { t } = useTranslation('actor')
  const router = useRouter()
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError
  } = useGetPersonFilmographyQuery({ media: 'movie', id, lang: router.locale })
  const {
    data: tv,
    isLoading: tvIsLoading,
    error: tvError
  } = useGetPersonFilmographyQuery({ media: 'tv', id, lang: router.locale })

  if (moviesIsLoading || tvIsLoading) {
    return <Loader />
  }

  if (moviesError || tvError) {
    console.log(moviesError, 'ERROR Filmography movies')
    console.log(tvError, 'ERROR Filmography tvId')
  }

  return (
    <div>
      <SubTitle title={t('filmography')} />
      <TabsSelection keyMovie='Movies actor' keyTV='TV Series actor' movies={movies} tv={tv} />
    </div>
  )
}

export default Filmography
