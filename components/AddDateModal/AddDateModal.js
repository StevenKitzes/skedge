import { useEffect } from 'react'
import clsx from 'clsx'
import DatePicker from 'react-datepicker'
import Button from '../Button'
import styles from './AddDateModal.module.scss'

function AddDateModal({ closeModal, dates, hasTime, open, pickerDate, setDates, setPickerDate }) {
  useEffect(() => {
    document.querySelector('.react-datepicker__input-container input').disabled = 'disabled'
  })

  return (
    <div
      className={clsx(styles.backing, !open && styles.hidden)}
    >
      <div id='modal' className={styles.modal}>
        <DatePicker
          dateFormat="MMMM d, yyyy"
          onChange={(date) => setPickerDate(date.getTime())}
          open
          popperPlacement='top-start'
          selected={pickerDate}
          shouldCloseOnSelect={false}
          startOpen
          timeFormat="h:mm aa"
        />
        {hasTime && <p>time selector dropdown will go here</p>}
        <Button
          classes={styles.button}
          label='Cancel'
          onClick={closeModal}
          variant='outlined'
        />
        <Button
          classes={styles.button}
          label='Select'
          onClick={() => {
            if (!dates.includes(pickerDate)) setDates([...dates, pickerDate].sort())
            closeModal()
          }}
        />
      </div>
    </div>
  )
}

export default AddDateModal
