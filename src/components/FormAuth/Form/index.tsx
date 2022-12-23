import { NextPage } from 'next'
import { Form, Input, message } from 'antd'
import { IAuthPage } from 'models/authPage.interface'
import styles from './styles.module.scss'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useAppDispatch } from 'hooks/redux'
import { useAuth } from 'hooks/useAuth'
import { setUser } from 'store/slices/userSlice'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

interface IForm {
  name?: string
  email: string
  password: string
}

const FormAuth: NextPage<IAuthPage> = ({ type }) => {
  const { t: tAuthForm } = useTranslation('authForm')
  const router = useRouter()
  const { auth } = useAuth()
  const dispatch = useAppDispatch()

  const onFinish = async (values: IForm) => {
    console.log('Success:', values)
    switch (type) {
      case 'Login':
        try {
          await signInWithEmailAndPassword(auth, values.email, values.password).then(({ user }) => {
            console.log(user)
            user.getIdToken().then((token) => {
              dispatch(
                setUser({
                  id: user.uid,
                  email: user.email,
                  token
                })
              )
              message.success(tAuthForm('successful-login'))
              localStorage.setItem('uid', user.uid)
            })
          })
          await router.push('/')
        } catch (e) {
          console.log(e)
          message.error(tAuthForm('failed-login'))
        }
        break
      case 'Register':
        try {
          await createUserWithEmailAndPassword(auth, values.email, values.password).then(({ user }) => {
            console.log(user, values)
            user.getIdToken().then((token) => {
              dispatch(
                setUser({
                  id: user.uid,
                  email: user.email,
                  token
                })
              )
              localStorage.setItem('token', token)
            })
          })
          message.success(tAuthForm('successful-register'))
          router.push('/')
        } catch (e) {
          console.log(e)
          message.error(tAuthForm('failed-register'))
        }
        break
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name='form'
      layout='vertical'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      {type === 'Register' && (
        <Form.Item
          label={<span className='font-semibold'>{tAuthForm('name')}</span>}
          name='name'
          rules={[{ required: true, message: tAuthForm('valid-name') }]}>
          <Input size='large' />
        </Form.Item>
      )}
      <Form.Item
        label={<span className='font-semibold'>{tAuthForm('email')}</span>}
        name='email'
        rules={[{ required: true, message: tAuthForm('valid-email') }]}>
        <Input size='large' />
      </Form.Item>
      <Form.Item
        label={<span className='font-semibold'>{tAuthForm('password')}</span>}
        name='password'
        rules={[{ required: true, message: tAuthForm('valid-password') }]}>
        <Input.Password size='large' />
      </Form.Item>
      <Form.Item>
        <button className={styles.submit}>{tAuthForm(type.toLowerCase())}</button>
      </Form.Item>
    </Form>
  )
}

export default FormAuth
