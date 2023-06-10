import { NextPage } from 'next'
import MenuButton from '../../MenuButton'
import AvatarProfile from './Avatar'
import Search from './Search'
import styles from './styles.module.scss'

interface IProps {
  open: boolean
  setOpen: (bol: boolean) => void
}

const Header: NextPage<IProps> = ({ open, setOpen }) => {
  return (
    <header className={styles.header}>
      <div className={styles.bgMenu}>
        <MenuButton open={open} setOpen={setOpen} />
      </div>
      <Search />
      <AvatarProfile />
    </header>
  )
}

export default Header
