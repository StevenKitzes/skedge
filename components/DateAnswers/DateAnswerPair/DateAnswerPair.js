import styles from './DateAnswerPair.module.scss'

function DateAnswerPair({ alternateColor, response }) {
  const style = alternateColor ? styles.pairAlt : styles.pair

  if (response === 1) return (
    <div className={style}>
      <img className={styles.icon} alt='Accepted' src='/images/skedge-accept.svg' />
      <img className={styles.icon} alt='Not declined' src='/images/skedge-decline-gray.svg' />
    </div>
  )
  if (response === 0) return (
    <div className={style}>
      <img className={styles.icon} alt='Not accepted' src='/images/skedge-accept-gray.svg' />
      <img className={styles.icon} alt='Declined' src='/images/skedge-decline.svg' />
    </div>
  )
  if (response === -1) return (
    <div className={style}>
      <img className={styles.icon} alt='Not accepted' src='/images/skedge-accept-gray.svg' />
      <img className={styles.icon} alt='Not declined' src='/images/skedge-decline-gray.svg' />
    </div>
  )
  return (
    <p>error: {response}</p>
  )
}

export default DateAnswerPair
