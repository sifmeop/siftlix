import { ISidebarItem } from 'models/sidebarItem.interface'
import HomeIcon from 'assets/images/sidebar/home.svg'
import DiscoveryIcon from 'assets/images/sidebar/discovery.svg'
import TrendingNowIcon from 'assets/images/sidebar/trend.svg'
import UpcomingIcon from 'assets/images/sidebar/upcoming.svg'
import FavoritesIcon from 'assets/images/sidebar/fav.svg'
import { MdOutlineReviews } from 'react-icons/md'

export const menuItems: ISidebarItem[] = [
  { title: 'home', href: '/', icon: HomeIcon },
  { title: 'discovery', href: '/discovery', icon: DiscoveryIcon },
  { title: 'trending-now', href: '/trending-now', icon: TrendingNowIcon },
  { title: 'upcoming', href: '/upcoming', icon: UpcomingIcon }
]

export const libraryItems: ISidebarItem[] = [
  { title: 'favorites', href: '/favorites', icon: FavoritesIcon },
  { title: 'reviews', href: '/reviews', icon: MdOutlineReviews }
]
