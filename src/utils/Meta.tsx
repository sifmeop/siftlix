import { NextPage } from 'next'
import Head from 'next/head'

interface IProps {
  title: string
  description: string
}

const Meta: NextPage<IProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  )
}

export default Meta
