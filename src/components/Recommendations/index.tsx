import { NextPage } from 'next'
import styles from './styles.module.scss'
import { useGetRecommendationsQuery } from 'store/api/theMovieDB'
import Loader from 'components/UI/Loader'
import MoviesList from 'components/MoviesList'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  id: string
  media: string
}

const Recommendations: NextPage<IProps> = ({ media, id }) => {
  const { t } = useTranslation('movie-page')
  const router = useRouter()
  const { data, isLoading, error } = useGetRecommendationsQuery({ media, id, lang: router.locale })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'Error Recommendations')
  }

  return (
    <>
      {data?.length! > 0 ? (
        <>
          <MoviesList title={t('recommendations')} data={data} />
        </>
      ) : (
        <h2 className={styles.title}>{t('no-recommendations')}</h2>
      )}
    </>
  )
}

export default Recommendations
