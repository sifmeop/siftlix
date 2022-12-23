import { NextPage } from 'next'
import styles from './styles.module.scss'
import { libraryItems, menuItems } from '../Sidebar/sidebarItems'
import Link from 'next/link'
import { footerItems } from './footerItems'
import useTranslation from 'next-translate/useTranslation'

const Footer: NextPage = () => {
  const { t } = useTranslation('sidebar')
  return (
    <footer className={styles.footer}>
      <ul className={styles.flexItems}>
        {menuItems.map((item) => (
          <li className={styles.flexItem} key={item.title}>
            <Link href={item.href}>{t(item.title)}</Link>
          </li>
        ))}
        {libraryItems.map((item) => (
          <li className={styles.flexItem} key={item.title}>
            <Link href={item.href}>{t(item.title)}</Link>
          </li>
        ))}
      </ul>
      <ul className={styles.flexItems}>
        {footerItems.map((item) => (
          <li className={styles.flexItem} key={item.href}>
            <Link href={item.href} target='_blank'>
              {<item.icon />}
            </Link>
          </li>
        ))}
      </ul>
      @ 2022 Sifmeop
    </footer>
  )
}

export default Footer
