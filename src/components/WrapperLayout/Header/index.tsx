import { NextPage } from 'next'
import styles from './styles.module.scss'
import Search from './Search'
import AvatarProfile from './Avatar'
import MenuButton from '../../MenuButton'

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
