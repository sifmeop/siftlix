import { NextPage } from 'next'
import type { MenuProps } from 'antd'
import { Avatar, Dropdown } from 'antd'
import { LoginOutlined, LogoutOutlined, QuestionOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from 'hooks/useAuth'
import { signOut } from 'firebase/auth'
import { removeUser } from 'store/slices/userSlice'
import { useAppDispatch } from 'hooks/redux'
import styles from './styles.module.scss'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

const AvatarProfile: NextPage = () => {
  const { t } = useTranslation('avatar')
  const { auth, isAuth } = useAuth()
  const dispatch = useAppDispatch()

  const logout = async () => {
    await signOut(auth).then(() => {
      dispatch(removeUser())
      localStorage.removeItem('uid')
    })
  }

  const items: MenuProps['items'] = isAuth
    ? [
        {
          label: <button onClick={logout}>{t('logout')}</button>,
          key: 'logout',
          icon: <LogoutOutlined size={30} />
        }
      ]
    : [
        {
          label: <Link href='/login'>{t('login')}</Link>,
          key: 'login',
          icon: <LoginOutlined size={30} />
        },
        {
          type: 'divider'
        },
        {
          label: <Link href='/register'>{t('register')}</Link>,
          key: 'register',
          icon: <LoginOutlined size={30} />
        }
      ]

  return (
    <div>
      {isAuth ? (
        <Dropdown placement='bottomRight' menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar
              className={styles.avatar}
              style={{ cursor: 'pointer' }}
              size={50}
              src={auth.currentUser?.photoURL}
              icon={auth.currentUser ? <UserOutlined /> : <QuestionOutlined />}
            />
          </a>
        </Dropdown>
      ) : (
        <Dropdown placement='bottomRight' menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar className={styles.avatar} style={{ cursor: 'pointer' }} size={50} icon={<QuestionOutlined />} />
          </a>
        </Dropdown>
      )}
    </div>
  )
}

export default AvatarProfile
