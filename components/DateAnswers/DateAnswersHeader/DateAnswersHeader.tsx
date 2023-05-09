import clsx from 'clsx'
import styles from './DateAnswersHeader.module.scss'

type DateAnswersHeaderProps = {
  classes: string,
}

function DateAnswersHeader({ classes }: DateAnswersHeaderProps): JSX.Element {
  return (
    <div className={clsx(classes, styles.headerContainer)} id='header-container'>
      Select all of the dates you can join the event!
    </div>
  )
}

export default DateAnswersHeader
