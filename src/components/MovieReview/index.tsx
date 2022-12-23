import { NextPage } from 'next'
import styles from './styles.module.scss'
import { TbPencil, TbPencilOff } from 'react-icons/tb'
import { useState } from 'react'
import { useAppSelector } from 'hooks/redux'
import { Button, Input, message, Modal as ModalView, Rate, Tooltip } from 'antd'
import { MOVIE_IMAGE_URL } from 'utils/constants'
import { ref, remove, set } from '@firebase/database'
import { db } from '../../../firebase'
import { useAuth } from 'hooks/useAuth'
import { IMovieCard } from 'models/movie.interface'
import Img from 'components/Img'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  movie: IMovieCard
}

const MovieReview: NextPage<IProps> = ({ movie }) => {
  const { t: tGlobal } = useTranslation('global')
  const { t: tReviews } = useTranslation('reviews')
  const [review, setReview] = useState<IMovieCard>(movie)
  const { isAuth } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(0)
  const [value, setValue] = useState<string>('')
  const { TextArea } = Input
  const { reviews } = useAppSelector((state) => state.reviews)

  const checkAuth = () => {
    if (!isAuth) {
      message.error(`${tReviews('need-login')}`)
      return
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    if (value.trim() === '' || value.length < 9) {
      message.error(`${tGlobal('valid-review')}: ${value.length}`)
      return
    }
    const reference = ref(db, 'reviews/' + `${localStorage.getItem('uid')!}/` + movie.id)
    const values: {
      desc: string
      rate: number
    } = {
      desc: value,
      rate
    }
    try {
      await set(reference, { ...movie, ...values }).then(() => {
        message.success(
          `${tGlobal('added-review')} for ${movie.title ? tGlobal('movie') : tGlobal('tv')} ${movie.title}`
        )
        setValue('')
        setIsModalOpen(false)
      })
    } catch (e) {
      console.log(e, 'addToReview DB')
    }
  }

  const removeReview = async () => {
    const reference = ref(db, 'reviews/' + `${localStorage.getItem('uid')!}/` + movie.id)
    try {
      await remove(reference).then(() => {
        message.success(`${tGlobal('removed-review')} ${movie.title ? tGlobal('movie') : tGlobal('tv')} ${movie.title}`)
      })
    } catch (e) {
      console.log(e, 'removeReview DB')
    }
  }

  return (
    <>
      {reviews.some((item) => item.id === review.id) ? (
        <Tooltip title={tGlobal('delete-review')}>
          <div>
            <TbPencilOff onClick={removeReview} className={styles.icon} size='1.5rem' />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title={tGlobal('rate-review')}>
          <div>
            <TbPencil onClick={checkAuth} className={styles.icon} size='1.5rem' />
          </div>
        </Tooltip>
      )}
      <ModalView
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key='submit' onClick={handleSubmit} type='primary'>
            {tGlobal('add')}
          </Button>,
          <Button key='cancel' onClick={() => setIsModalOpen(false)}>
            {tGlobal('cancel')}
          </Button>
        ]}
        title={movie.title}
        open={isModalOpen}>
        <div className='text-center'>
          <h1 className='font-medium text-xl mb-3'>{tGlobal('review')}</h1>
          <div className='inline-block bg-slate-200 p-1.5 mb-3 rounded-lg'>
            <Img
              height={150}
              width={225}
              poster={`${MOVIE_IMAGE_URL}/${movie.poster_path}`}
              title={movie.title || movie.name}
            />
          </div>
          <p className='text-left text-lg mb-1'>{tGlobal('your-review')}</p>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoSize
            className='mb-3'
            placeholder={tGlobal('write-review')}
          />
          <p className='text-left text-lg mb-1'>{tGlobal('your-rating')}</p>
          <h2 className='font-bold text-2xl'>{rate}</h2>
          <Rate className='mb-3' value={rate} onChange={setRate} count={10} allowClear={false} defaultValue={0} />
        </div>
      </ModalView>
    </>
  )
}

export default MovieReview
