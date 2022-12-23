import Img from 'components/Img'
import { IPersonDetails } from 'models/personDetails.interface'
import { NextPage } from 'next'
import { ITableInfo } from 'models/tableInfo.interface'
import Biography from './biography'
import Filmography from './filmography'
import styles from './styles.module.scss'
import { Divider } from 'antd'
import Table from 'components/TableInfo/Table'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  actor: IPersonDetails
}

const ActorID: NextPage<IProps> = ({ actor }) => {
  const { t } = useTranslation('actor')
  const infoTable: ITableInfo[] = [
    {
      title: t('birthday'),
      description:
        `${new Intl.DateTimeFormat('ru').format(new Date(actor.birthday))}, (${
          new Date().getFullYear() - new Date(actor.birthday).getFullYear()
        } year)` || '-'
    },
    { title: t('place-birth'), description: actor.place_of_birth },
    { title: t('know-as'), description: actor.also_known_as.map((name) => name).join(', ') || '-' }
  ]

  return (
    <div>
      <div className={styles.info}>
        <Img width={300} height={500} poster={actor.profile_path} title={actor.name} />
        <div>
          <h1 className={styles.name}>{actor.name}</h1>
          <Table data={infoTable} />
        </div>
      </div>
      <Biography biography={actor.biography} />
      <Divider />
      <Filmography id={actor.id.toString()} />
    </div>
  )
}

export default ActorID
