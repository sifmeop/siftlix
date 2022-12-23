import Title from 'components/Title'
import Loader from 'components/UI/Loader'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import ActorID from 'screens/actor'
import { useGetPersonDetailsQuery } from 'store/api/theMovieDB'
import Meta from 'utils/Meta'

const Index: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useGetPersonDetailsQuery({ id: id?.toString()!, lang: router.locale })

  console.log(data)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'ERROR PERSON')
  }

  return (
    <>
      {data ? (
        <>
          <Meta title={data.name} description={`Description of the actor ${data.name}`} />
          <ActorID actor={data} />
        </>
      ) : (
        <Title title='Error Actor ID' />
      )}
    </>
  )
}

export default Index
