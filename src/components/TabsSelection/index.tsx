import { Tabs } from 'antd'
import MoviesList from 'components/MoviesList'
import { IMovieCard } from 'models/movie.interface'
import { NextPage } from 'next'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  keyMovie: string
  keyTV: string
  movies: IMovieCard[] | undefined
  tv: IMovieCard[] | undefined
}

const TabsSelection: NextPage<IProps> = ({ keyMovie, keyTV, movies, tv }) => {
  const { t } = useTranslation('global')
  return (
    <Tabs
      defaultActiveKey='1'
      size='large'
      items={[
        {
          label: t('movies'),
          key: keyMovie,
          children: <MoviesList data={movies} />
        },
        {
          label: t('tv-series'),
          key: keyTV,
          children: <MoviesList data={tv} />
        }
      ]}
    />
  )
}

export default TabsSelection
