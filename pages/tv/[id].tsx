import { NextPage } from 'next'
import Meta from 'utils/Meta'
import { useRouter } from 'next/router'
import { useGetDetailsTVQuery } from 'store/api/theMovieDB'
import Loader from 'components/UI/Loader'
import Title from 'components/Title/index'
import TVId from 'screens/tvId'

const Index: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useGetDetailsTVQuery({ id, lang: router.locale })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'TV ID ERROR')
  }

  return data ? (
    <>
      <Meta title={data.name} description={data.overview} />
      <TVId tv={data} />
    </>
  ) : (
    <Title title='Error TV ID' />
  )
}

export default Index
