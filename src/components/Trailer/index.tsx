import { NextPage } from 'next'
import { IVideo } from 'models/video.interface'
import Title from 'components/Title'

interface IProps {
  data: IVideo[] | undefined
}

const Trailer: NextPage<IProps> = ({ data }) => {
  const getTrailer = (list: IVideo[] | undefined): string | undefined => {
    if (list === undefined) {
      return
    }
    let id = ''
    list.map((video) => {
      if (video.type === 'Trailer') {
        id = video.key
        return
      } else {
        id = video.key
        return
      }
    })
    return id
  }

  return data?.length ? (
    <iframe
      width='100%'
      height='625px'
      src={`https://www.youtube.com/embed/${getTrailer(data)}`}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      style={{ marginBottom: '30px' }}
      allowFullScreen
    />
  ) : (
    <Title title='No video' />
  )
}

export default Trailer
