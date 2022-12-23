import { NextPage } from 'next'
import { useAppSelector } from 'hooks/redux'
import MoviesList from 'components/MoviesList'
import Title from 'components/Title'
import { useAuth } from 'hooks/useAuth'
import useTranslation from 'next-translate/useTranslation'

const Favorites: NextPage = () => {
  const { t } = useTranslation('favorites')
  const { isAuth } = useAuth()
  const favorites = useAppSelector((state) => state.favorites.favorites)

  return isAuth ? (
    favorites.length > 0 ? (
      <MoviesList title={t('favorites')} data={favorites} />
    ) : (
      <Title title={t('no-favorites')} />
    )
  ) : (
    <Title title={t('need-login')} />
  )
}

export default Favorites
