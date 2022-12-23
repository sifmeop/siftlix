import { NextPage } from 'next'
import Favorites from 'screens/favorites'
import Meta from 'utils/Meta'
import useTranslation from 'next-translate/useTranslation'

const Index: NextPage = () => {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <Meta title={t('favorites')} description='List of what you have added to your favorites' />
      <Favorites />
    </>
  )
}

export default Index
