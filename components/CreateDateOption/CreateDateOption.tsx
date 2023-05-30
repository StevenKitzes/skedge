import clsx from 'clsx'
import styles from './CreateDateOption.module.scss'
import dateStringsFromEpoch from '../../helpers/dateStringsFromEpoch'

type CreateDateOptionProps = {
  dateEpoch: number,
  deleteFn: (n: number) => void,
  hasTime: boolean,
}

function CreateDateOption({ dateEpoch, deleteFn, hasTime }: CreateDateOptionProps): JSX.Element {
  const {dateString, timeString} = dateStringsFromEpoch(dateEpoch)
  
  return (
    <div className={clsx(hasTime ? styles.containerHasTime : styles.containerNoTime, styles.container)}>
      <span className={clsx(hasTime ? styles.dateHasTime : styles.dateNoTime)}>{dateString}</span>
      {hasTime && <span className={styles.time}>{timeString}</span>}
      <img
        alt='Delete'
        className={styles.delete}
        onClick={() => deleteFn(dateEpoch)}
      />
    </div>
  )
}

export default CreateDateOption
