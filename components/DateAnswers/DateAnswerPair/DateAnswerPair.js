import clsx from 'clsx'
import styles from './DateAnswerPair.module.scss'

function DateAnswerPair({ alternateColor, date, response, setUserResponses, userResponses }) {
  const style = alternateColor ? styles.pairAlt : styles.pair
  const clickable = !!userResponses ? styles.clickable : null;

  function update(status) {
    const result = {...userResponses}
    result[date] = status
    setUserResponses(result)
  }

  if (response === 1) return (
    <div className={style}>
      <img
        className={styles.icon}
        alt='Accepted'
        src='/images/skedge-accept.svg'
      />
      <img
        className={clsx(styles.icon, clickable)}
        alt='Not declined'
        src='/images/skedge-decline-gray.svg'
        onClick={() => update(0)}
      />
    </div>
  )
  if (response === 0) return (
    <div className={style}>
      <img
        className={clsx(styles.icon, clickable)}
        alt='Not accepted'
        src='/images/skedge-accept-gray.svg'
        onClick={() => update(1)}
      />
      <img
        className={styles.icon}
        alt='Declined'
        src='/images/skedge-decline.svg'
      />
    </div>
  )
  if (response === -1) return (
    <div className={style}>
      <img
        className={clsx(styles.icon, clickable)}
        alt='Not accepted'
        src='/images/skedge-accept-gray.svg'
        onClick={() => update(0)}
      />
      <img
        className={clsx(styles.icon, clickable)}
        alt='Not declined'
        src='/images/skedge-decline-gray.svg'
        onClick={() => update(1)}
      />
    </div>
  )
  return (
    <p>error: {response}</p>
  )
}

export default DateAnswerPair
