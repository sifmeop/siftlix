import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Meta from 'utils/Meta'
import MoviesList from 'components/MoviesList'
import Title from 'components/Title'
import Loader from 'components/UI/Loader'
import { useGetDiscoverListQuery, useGetGenresListQuery } from 'store/api/theMovieDB'
import { getOneGenre } from 'utils/getOneGenre'
import useTranslation from 'next-translate/useTranslation'

const DiscoveryPage: NextPage = () => {
  const { t } = useTranslation('global')
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useGetDiscoverListQuery({ media: 'tv', id, lang: router.locale })
  const { data: tv } = useGetGenresListQuery({ media: 'tv', lang: router.locale })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'useGetDiscoverListQuery')
  }

  return (
    <>
      {data?.length! > 0 ? (
        <>
          <Meta title={getOneGenre(Number(id), tv)} description={`${t('genre')} ${getOneGenre(Number(id), tv)}`} />
          <MoviesList title={`${t('genre')} ${getOneGenre(Number(id), tv)}`} data={data} />
        </>
      ) : (
        <Title title='Error Genre ID' />
      )}
    </>
  )
}

export default DiscoveryPage
