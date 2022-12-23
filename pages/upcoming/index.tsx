import { NextPage } from 'next'
import Meta from 'utils/Meta'
import Upcoming from 'screens/upcoming'
import useTranslation from 'next-translate/useTranslation'

const Index: NextPage = () => {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <Meta title={t('upcoming')} description="You can see a list of what's coming soon here" />
      <Upcoming />
    </>
  )
}

export default Index
