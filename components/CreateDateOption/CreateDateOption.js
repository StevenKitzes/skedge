import months from '../../helpers/months'
import styles from './CreateDateOption.module.scss'

function CreateDateOption({ dateEpoch, deleteFn }) {
  const date = new Date(dateEpoch)
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const dateString = `${months[month]} ${day}, ${year}`
  const timeString = `${hours % 12 ? hours % 12 : '12'}:${minutes || '00'}${hours > 11 ? 'pm' : 'am'}`
  
  return (
    <div className={styles.container}>
      <span className={styles.date}>{dateString}</span>
      <span className={styles.time}>{timeString}</span>
      <img
        alt='Delete'
        className={styles.delete}
        onClick={() => deleteFn(dateEpoch)}
        src='../images/skedge-delete.svg'
      />
    </div>
  )
}

export default CreateDateOption
