import { NextPage } from 'next'
import { ISidebarItem } from 'models/sidebarItem.interface'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  title: string
  list: ISidebarItem[]
  open: boolean
  setOpen: (open: boolean) => void
}

const SidebarLists: NextPage<IProps> = ({ open, setOpen, title, list }) => {
  const { t } = useTranslation('sidebar')
  const router = useRouter()

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>{title}</h2>
      <ul>
        {list.map((item) => (
          <li key={item.title} className={styles.item}>
            <Link
              href={item.href}
              className={router.pathname === item.href ? `${styles.link} ${styles.active}` : styles.link}
              onClick={() => setOpen(!open)}>
              {<item.icon size='1.5625rem' />}
              {t(item.title)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarLists
