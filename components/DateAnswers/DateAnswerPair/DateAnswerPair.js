import clsx from 'clsx'
import styles from './DateAnswerPair.module.scss'
import dateStringsFromEpoch from '../../../helpers/dateStringsFromEpoch'

function DateAnswerPair({ alternateColor, date, hasTime, response, setUserResponses, userResponses }) {
  const unavailabilityStyle = alternateColor ? styles.unavailableAlt : styles.unavailable
  const clickable = !!userResponses ? styles.clickable : null
  const {dateString, timeString} = dateStringsFromEpoch(date)

  function update(status) {
    const result = {...userResponses}
    result[date] = status
    setUserResponses(result)
  }

  return (
    <div
      className={clsx(styles.dateAnswer, response ? styles.availabilityStyle : unavailabilityStyle, clickable)}
      onClick={() => update(!response)}
    >
      <p className={styles.date}>{dateString}</p>
      {hasTime && <p className={styles.time}>{timeString}</p>}
    </div>
  )
}

export default DateAnswerPair
