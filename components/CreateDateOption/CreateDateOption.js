import styles from './CreateDateOption.module.scss'

function CreateDateOption({ dateEpoch, deleteFn }) {
  const dateObj = new Date(dateEpoch)
  const dateStr = dateObj.toLocaleString()
    .replace('00:00', '00')
    .replace('30:00', '30')
    .replace(' AM', 'am')
    .replace(' PM', 'pm')
    .replace(',', '')
  const dateParts = dateStr.split(' ')

  return (
    <div className={styles.container}>
      <span className={styles.date}>{dateParts[0]}</span>
      <span className={styles.date}>{dateParts[1]}</span>
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
