import styles from './CreateDateOption.module.scss'
import dateStringsFromEpoch from '../../helpers/dateStringsFromEpoch'

function CreateDateOption({ dateEpoch, deleteFn }) {
  const {dateString, timeString} = dateStringsFromEpoch(dateEpoch)
  
  return (
    <div className={styles.container}>
      <span className={styles.date}>{dateString}</span>
      <span className={styles.time}>{timeString}</span>
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
