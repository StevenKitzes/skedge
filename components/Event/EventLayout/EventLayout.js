import DateAnswersHeader from '../../DateAnswers/DateAnswersHeader'
import DateAnswersRow from '../../DateAnswers/DateAnswersRow'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLayout.module.scss'

function EventLayout ({ eventData, guestsData, userData }) {
  return (
    <Layout noMargin showLogo>
      <h1 className={styles.title}>{eventData.eventName}</h1>
      {eventData.nick &&
        <p className={styles.organizerNick}>by {eventData.nick}</p>
      }
      <p className={styles.description}>{eventData.eventDesc}</p>
      <Separator />
      <DateAnswersHeader dates={eventData.dates} />
      <div className={styles.chartContainer}>
        {guestsData.map((guest, index) => {
          const responses = []
          eventData.dates.forEach((date) => {
            const dateStr = date.toString()
            if (!guest.responses.hasOwnProperty(dateStr)) return responses.push(-1)
            if (guest.responses[date] === 1) return responses.push(1)
            if (guest.responses[date] === 0) return responses.push(0)
            return responses.push(-1)
          })
          return (
            <DateAnswersRow
              hasSeparator={index > 0} 
              key={guest.userId}
              nickname={guest.nickname}
              responses={responses}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default EventLayout
