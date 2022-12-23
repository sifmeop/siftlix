import { NextPage } from 'next'
import Discovery from 'screens/discovery'
import Meta from 'utils/Meta'
import useTranslation from 'next-translate/useTranslation'

const Index: NextPage = () => {
  const { t } = useTranslation('sidebar')
  return (
    <>
      <Meta title={t('discovery')} description='Here you can see all kinds of genres' />
      <Discovery />
    </>
  )
}

export default Index
