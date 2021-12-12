import styles from './CreateDateOption.module.scss'
import dateStringsFromEpoch from '../../helpers/dateStringsFromEpoch'

function CreateDateOption({ dateEpoch, deleteFn, hasTime }) {
  const {dateString, timeString} = dateStringsFromEpoch(dateEpoch)
  
  return (
    <div className={hasTime ? styles.containerHasTime : styles.containerNoTime}>
      <span className={hasTime ? styles.dateHasTime : styles.dateNoTime}>{dateString}</span>
      {hasTime && <span className={styles.time}>{timeString}</span>}
      <img
        alt='Delete'
        className={styles.delete}
        onClick={() => deleteFn(dateEpoch)}
        src='/images/skedge-delete.svg'
      />
    </div>
  )
}

export default CreateDateOption
