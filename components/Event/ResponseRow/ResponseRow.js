import clsx from 'clsx'
import styles from './ResponseRow.module.scss'

function ResponseRow ({dateAnswerPairs, idString, rowStyle, scrollHandler, scrollLeft, scrollRight}) {
  return (
    <div className={styles.topLevelAnswersContainer}>
      <div className={clsx(styles.scrollIndicator, scrollLeft)} />
      <div className={clsx(styles.scrollIndicator, scrollRight)} />
      <div
        className={clsx(rowStyle, 'date-answers-row-scroll')}
        id={idString}
        onScroll={scrollHandler}
      >
        {dateAnswerPairs}
      </div>
    </div>
  )
}

export default ResponseRow
