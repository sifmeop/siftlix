import { NextPage } from 'next'
import styles from './styles.module.scss'
import MiniLoader from 'components/UI/MiniLoader'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { useGetSearchQuery } from 'store/api/theMovieDB'
import useClickOutSide from 'hooks/useClickOutSide'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Star from 'assets/images/movieCard/star.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { checkTypeMedia } from 'utils/checkTypeMedia'
import { getYear } from 'utils/getYear'
import Img from 'components/Img'
import { ISearch } from 'models/search.interface'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const Search: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('global')
  const [search, setSearch] = useState<string>('')
  const [dropdown, setDropdown] = useState<boolean>(false)
  const debounced = useDebounce(search)
  const { data, isLoading, error } = useGetSearchQuery(
    { search: debounced, lang: router.locale },
    {
      skip: debounced.length < 2
    }
  )

  useEffect(() => {
    setDropdown(debounced.length > 2 && data?.length! > 0)
  }, [debounced, data])

  const searchRef = useRef(null)

  useClickOutSide(searchRef, () => handlerClickOnLink())

  if (error) {
    console.log(error, 'ERROR SEARCH')
  }

  const handlerClickOnLink = () => {
    setSearch('')
    setDropdown(false)
  }

  return (
    <div className='w-full text-center' ref={searchRef}>
      <Input
        suffix={<SearchOutlined />}
        size='large'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
        placeholder={t('search')}
      />
      {dropdown && (
        <ul className={styles.searchList}>
          {isLoading && <MiniLoader />}
          <AnimatePresence>
            {data &&
              data.map((item: ISearch) => (
                <motion.li
                  key={item.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className={styles.searchItem}>
                  <Link
                    className='flex items-center gap-3'
                    href={`/${checkTypeMedia(item.media_type)}/${item.id}`}
                    onClick={handlerClickOnLink}>
                    <Img title={item.title || item.name} width={80} height={100} poster={item.poster_path} />
                    <div>
                      <h1 className='text-xl font-bold mb-3'>{item.title || item.name}</h1>
                      <p className='mb-3'>{getYear(item.release_date) || getYear(item.first_air_date)}</p>
                      <p className='flex items-center gap-1'>
                        <Star />
                        <span>
                          {item.vote_average?.toFixed(1)} | {item.vote_count}
                        </span>
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}

export default Search
