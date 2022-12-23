import { NextPage } from 'next'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import Img from '../Img'
import MovieFav from '../MovieFav'
import MovieReview from '../MovieReview'
import { ITableInfo } from 'models/tableInfo.interface'
import Table from './Table'

interface IProps {
  data: any
  tableInfo: ITableInfo[]
}

const TableInfo: NextPage<IProps> = ({ tableInfo, data }) => {
  return (
    <div className={styles.info}>
      <motion.div
        key={data.title || data.name}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className='relative'>
        <div className='relative'>
          <Img
            width={300}
            height={500}
            title={data.title || data.name}
            poster={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          />
          <div className='flex gap-2 absolute bottom-5 left-5 bg-white shadow-xl p-1 rounded-lg'>
            <MovieFav movie={data} />
            <MovieReview movie={data} />
          </div>
        </div>
      </motion.div>
      <Table data={tableInfo} />
    </div>
  )
}

export default TableInfo
