import clsx from 'clsx'
import styles from './DateAnswer.module.scss'
import dateStringsFromEpoch from '../../../helpers/dateStringsFromEpoch'

type DateAnswerProps = {
  alternateColor: boolean,
  clickable: boolean,
  confirmFinalization: (d: number) => void,
  date: number,
  finalizedDate: number | null,
  finalizable: boolean,
  hasTime: boolean,
  isFinalized: boolean,
  isOrganizer: boolean,
  isPopular: boolean,
  response: boolean,
  setUserResponses: (r: {[key: string]: boolean}) => void,
  showFinalized: boolean,
  userResponses: {[key: string]: boolean},
}

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
  isPopular,
  response,
  setUserResponses,
  showFinalized,
  userResponses
}: DateAnswerProps): JSX.Element {
  const unavailabilityStyle = alternateColor ? styles.unavailableAlt : styles.unavailable
  const {dateString, timeString} = dateStringsFromEpoch(date)

  function update(status: boolean): void {
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
      {isPopular && !isFinalized && clickable &&
        <div className={styles.popular}>
          <span className={styles.popularCopy}>
            <img className={styles.star} alt='Popular choice!' src='/images/star.svg' /> Popular choice!
          </span>
        </div>
      }
    </div>
  )
}

export default DateAnswer
