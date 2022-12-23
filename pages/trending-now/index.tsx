import { NextPage } from 'next'
import TrendingNow from 'screens/trending-now'
import Meta from 'utils/Meta'
import useTranslation from 'next-translate/useTranslation'

const Index: NextPage = () => {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <Meta title={t('trending-now')} description="See what's trending in movies or TV shows right now" />
      <TrendingNow />
    </>
  )
}

export default Index
