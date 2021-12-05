import clsx from 'clsx'
import months from '../../../helpers/months'
import styles from './DateAnswersHeader.module.scss'

function DateAnswersHeader({ classes, dates, handleScroll }) {
  return (
    <div className={clsx(classes, styles.headerContainer)} id='header-container'>
      Select all of the dates you can join the event!
      {/* <div className={styles.header} id='date-answers-header-scroll' onScroll={handleScroll}>
        {dates.map((date, index) => {
          const dateObj = new Date(date)
          const month = dateObj.getMonth()
          const day = dateObj.getDate()
          const year = dateObj.getFullYear()
          const hours = dateObj.getHours()
          const minutes = dateObj.getMinutes()
          const dateString = `${months[month]} ${day}, ${year}`
          const timeString = `${hours % 12 ? hours % 12 : '12'}:${minutes || '00'}${hours > 11 ? 'pm' : 'am'}`
        
          return (
            <div
              className={index % 2 === 0 ? styles.headerItemAlt : styles.headerItem}
              key={date}
            >
              <p className={styles.dateString}>{dateString}</p>
              <p className={styles.timeString}>{timeString}</p>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

export default DateAnswersHeader
