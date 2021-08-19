import months from '../../../helpers/months'
import styles from './DateAnswersHeader.module.scss'

function DateAnswersHeader({ dates }) {
  return (
    <div className={styles.header}>
      {dates.map((date) => {
        const dateObj = new Date(date)
        const month = dateObj.getMonth()
        const day = dateObj.getDate()
        const year = dateObj.getFullYear()
        const hours = dateObj.getHours()
        const minutes = dateObj.getMinutes()
        const dateString = `${months[month]} ${day}, ${year}`
        const timeString = `${hours % 12 ? hours % 12 : '12'}:${minutes || '00'}${hours > 11 ? 'pm' : 'am'}`
      
        return (
          <div className={styles.headerItem}>
            <p className={styles.dateString}>{dateString}</p>
            <p className={styles.timeString}>{timeString}</p>
          </div>
        )
      })}
    </div>
  )
}

export default DateAnswersHeader
