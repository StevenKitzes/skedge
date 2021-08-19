import DateAnswerPair from '../DateAnswerPair'
import styles from './DateAnswersRow.module.scss'

function DateAnswersRow ({ hasSeparator, nickname, responses }) {
  return (
    <div className={styles.row}>
      {hasSeparator && <hr className={styles.rowSeparator} />}
      <p className={styles.nickname}>
        {nickname}
      </p>
      <div className={styles.answers}>
        {responses.map((response) => <DateAnswerPair response={response} />)}
      </div>
    </div>
  )
}

export default DateAnswersRow
