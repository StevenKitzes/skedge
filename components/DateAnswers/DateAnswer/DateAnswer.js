import clsx from 'clsx'
import styles from './DateAnswer.module.scss'
import dateStringsFromEpoch from '../../../helpers/dateStringsFromEpoch'

function DateAnswer({
  alternateColor,
  clickable,
  confirmFinalization,
  date,
  finalizedDate,
  finalizable,
  hasTime,
  isFinalized,
  isOrganizer,
  response,
  setUserResponses,
  showFinalized,
  userResponses
}) {
  const unavailabilityStyle = alternateColor ? styles.unavailableAlt : styles.unavailable
  const {dateString, timeString} = dateStringsFromEpoch(date)

  function update(status) {
    const result = {...userResponses}
    result[date] = status
    setUserResponses(result)
  }

  const colorStyle = isFinalized && showFinalized ? 
    finalizedDate === date ?
      styles.finalizedSelected :
      styles.finalizedUnselected :
    response ? styles.availabilityStyle : unavailabilityStyle

  return (
    <div>
      <div
        className={clsx(
          styles.dateAnswer,
          colorStyle,
          clickable && !isFinalized ? styles.clickable : styles.unclickable
        )}
        onClick={() => clickable && !isFinalized ? update(!response) : null}
      >
        <p className={styles.date}>{dateString}</p>
        {hasTime && <p className={styles.time}>{timeString}</p>}
      </div>
      {isOrganizer && !isFinalized && finalizable &&
        <p
          className={clsx(styles.finalizeButton, styles.clickable)}
          onClick={() => confirmFinalization(date)}
        >
          Select as final
        </p>
      }
    </div>
  )
}

export default DateAnswer
