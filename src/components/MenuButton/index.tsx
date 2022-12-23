import { NextPage } from 'next'
import styles from './styles.module.scss'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const MenuButton: NextPage<IProps> = ({ open, setOpen }) => {
  return (
    <button
      className={open ? `${styles.menuIcon} ${styles.menuActive}` : styles.menuIcon}
      onClick={() => setOpen(!open)}>
      <span></span>
    </button>
  )
}

export default MenuButton
