import { NextPage } from 'next'
import { motion } from 'framer-motion'
import styles from './styles.module.scss'
import { ITableInfo } from 'models/tableInfo.interface'

interface IProps {
  data: ITableInfo[]
}

const Table: NextPage<IProps> = ({ data }) => {
  return (
    <motion.table
      key='tableInfo'
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className={styles.table}>
      <tbody>
        {data.map((item) => (
          <tr className={styles.tr} key={item.title}>
            <td className={styles.tableTitle}>{item.title}:</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </motion.table>
  )
}

export default Table
