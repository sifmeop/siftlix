import { NextPage } from 'next'
import Home from 'screens/home'
import Meta from 'utils/Meta'
import useTranslation from 'next-translate/useTranslation'

const Index: NextPage = () => {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <Meta title={t('home')} description='Home page with popular movies and tv series' />
      <Home />
    </>
  )
}

export default Index
