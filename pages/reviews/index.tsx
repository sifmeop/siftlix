import { NextPage } from 'next'
import Reviews from 'screens/reviews'
import Meta from 'utils/Meta'
import useTranslation from 'next-translate/useTranslation'

const Index: NextPage = () => {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <Meta title={t('reviews')} description='Page where you can view or delete a movie review' />
      <Reviews />
    </>
  )
}

export default Index
