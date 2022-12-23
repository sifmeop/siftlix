import type { AppProps } from 'next/app'
import WrapperLayout from 'components/WrapperLayout'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import 'assets/global/global.scss'
import '../firebase'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
    </Provider>
  )
}
