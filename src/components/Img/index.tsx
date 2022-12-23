import { NextPage } from 'next'
import { MOVIE_IMAGE_URL } from 'utils/constants'
import Image from 'next/image'
import NotFound from 'assets/images/movieCard/image-not-found.png'

interface IProps {
  poster: string | null
  title: string | undefined
  width: number
  height: number
}

const Img: NextPage<IProps> = ({ poster, title, width, height }) => {
  return (
    <Image
      quality={80}
      width={width}
      height={height}
      src={poster ? `${MOVIE_IMAGE_URL}/${poster}` : NotFound}
      blurDataURL={poster ? `${MOVIE_IMAGE_URL}/${poster}` : NotFound.src}
      placeholder='blur'
      alt={title || '-'}
    />
  )
}

export default Img
