import { BsGithub, BsTelegram } from 'react-icons/bs'
import { IconType } from 'react-icons'

interface IFooterItems {
  icon: IconType
  href: string
}

export const footerItems: IFooterItems[] = [
  { icon: BsGithub, href: 'https://github.com/sifmeop' },
  { icon: BsTelegram, href: 'https://t.me/selivestru' }
]
