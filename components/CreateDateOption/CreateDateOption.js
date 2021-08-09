import styles from './CreateDateOption.module.scss'

function CreateDateOption({ dateEpoch, deleteFn }) {
  const dateObj = new Date(dateEpoch)
  const dateHuman = dateObj.toLocaleString()
    .replace('00:00', '00')
    .replace('30:00', '30')
    .replace(' AM', 'am')
    .replace(' PM', 'pm')

  return (
    <div className={styles.container}>
      <span className={styles.date}>{dateHuman}</span>
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
