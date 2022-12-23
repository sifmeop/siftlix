import { NextPage } from 'next'
import Title from 'components/Title'
import { Tabs } from 'antd'
import DiscoveryItem from './discoveryItem'
import { useGetGenresListQuery } from 'store/api/theMovieDB'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const Discovery: NextPage = () => {
  const { t } = useTranslation('global')
  const { t: tDiscovery } = useTranslation('discovery')
  const router = useRouter()
  const { data: movies } = useGetGenresListQuery({ media: 'movie', lang: router.locale })
  const { data: tv } = useGetGenresListQuery({ media: 'tv', lang: router.locale })
  return (
    <div>
      <Title title={tDiscovery('discovery')} />
      <Tabs
        defaultActiveKey='1'
        size='large'
        items={[
          {
            label: t('movies'),
            key: 'Discovery Movies',
            children: <DiscoveryItem media='movies' genres={movies} />
          },
          {
            label: t('tv-series'),
            key: 'Discovery TV Series ',
            children: <DiscoveryItem media='tv' genres={tv} />
          }
        ]}
      />
    </div>
  )
}

export default Discovery
