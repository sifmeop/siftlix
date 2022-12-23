import { NextPage } from 'next'
import { useAppSelector } from 'hooks/redux'
import ReviewsList from './ReviewsList'
import Title from 'components/Title'
import { useAuth } from 'hooks/useAuth'
import useTranslation from 'next-translate/useTranslation'

const Reviews: NextPage = () => {
  const { t } = useTranslation('reviews')
  const { isAuth } = useAuth()
  const reviews = useAppSelector((state) => state.reviews.reviews)

  return isAuth ? (
    reviews.length > 0 ? (
      <ReviewsList title={t('reviews')} data={reviews} />
    ) : (
      <Title title={t('no-reviews')} />
    )
  ) : (
    <Title title={t('need-login')} />
  )
}

export default Reviews
