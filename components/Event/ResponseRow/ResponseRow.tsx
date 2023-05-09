import clsx from 'clsx'
import styles from './ResponseRow.module.scss'

type ResponseRowProps = {
  dateAnswerPairs: JSX.Element[],
  idString?: string,
  rowStyle: string,
  scrollHandler: (e: React.UIEvent) => void,
  scrollLeft: string | null,
  scrollRight: string | null
}

function ResponseRow ({dateAnswerPairs, idString, rowStyle, scrollHandler, scrollLeft, scrollRight}: ResponseRowProps): JSX.Element {
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
