import { NextPage } from 'next'
import styles from './styles.module.scss'
import SidebarLists from './SidebarLists'
import { libraryItems, menuItems } from './sidebarItems'
import Logo from './Logo'
import MenuButton from '../../MenuButton'
import Language from './Language'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Sidebar: NextPage<IProps> = ({ open, setOpen }) => {
  const { t } = useTranslation('sidebar')
  return (
    <aside className={open ? styles.sidebar : `${styles.sidebar} ${styles.sidebarOff}`}>
      <div className={styles.sidebarTop}>
        <Logo />
        <MenuButton open={open} setOpen={setOpen} />
      </div>
      <div className={styles.sidebarItems}>
        <SidebarLists open={open} setOpen={setOpen} title={t('title-home')} list={menuItems} />
        <SidebarLists open={open} setOpen={setOpen} title={t('title-library')} list={libraryItems} />
      </div>
      <Language />
    </aside>
  )
}

export default Sidebar
