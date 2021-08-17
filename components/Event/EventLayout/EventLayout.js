import Hero from '../../Hero'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLayout.module.scss'

function EventLayout ({ eventData, guestsData, userData }) {
  return (
    <Layout showLogo>
      <h1 className={styles.title}>{eventData.eventName}</h1>
      {eventData.nick &&
        <p className={styles.organizerNick}>by {eventData.nick}</p>
      }
      <p className={styles.description}>{eventData.eventDesc}</p>
      <Separator />
    </Layout>
  )
}

export default EventLayout
