import clsx from 'clsx'
import styles from './DateAnswer.module.scss'
import dateStringsFromEpoch from '../../../helpers/dateStringsFromEpoch'

function DateAnswer({ alternateColor, clickable, confirmFinalization, date, hasTime, isOrganizer, response, setUserResponses, userResponses }) {
  const unavailabilityStyle = alternateColor ? styles.unavailableAlt : styles.unavailable
  const {dateString, timeString} = dateStringsFromEpoch(date)

  function update(status) {
    const result = {...userResponses}
    result[date] = status
    setUserResponses(result)
  }

  return (
    <div>
      <div
        className={clsx(
          styles.dateAnswer,
          response ? styles.availabilityStyle : unavailabilityStyle,
          clickable ? styles.clickable : styles.unclickable
          )}
          onClick={() => clickable ? update(!response) : null}
          >
        <p className={styles.date}>{dateString}</p>
        {hasTime && <p className={styles.time}>{timeString}</p>}
      </div>
      {isOrganizer &&
        <p
          className={styles.finalizeButton}
          onClick={() => confirmFinalization()}
        >
          Click here to finalize
        </p>
      }
    </div>
  )
}

export default DateAnswer
