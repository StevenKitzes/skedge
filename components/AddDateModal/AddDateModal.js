import clsx from 'clsx'
import DatePicker from 'react-datepicker'
import Button from '../Button'
import styles from './AddDateModal.module.scss'

function AddDateModal({ closeModal, dates, open, pickerDate, setDates, setPickerDate }) {
  return (
    <div
      className={clsx(styles.backing, !open && styles.hidden)}
    >
      <div id='modal' className={styles.modal}>
        <Button
          classes={styles.button}
          label='Select'
          onClick={() => {
            if (!dates.includes(pickerDate)) setDates([...dates, pickerDate].sort())
            closeModal()
          }}
        />
        <Button
          classes={styles.button}
          label='Cancel'
          onClick={closeModal}
          variant='outlined'
        />
        <DatePicker
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={(date) => setPickerDate(date.getTime())}
          open
          popperPlacement='bottom-start'
          selected={pickerDate}
          shouldCloseOnSelect={false}
          showTimeSelect
          startOpen
        />
      </div>
    </div>
  )
}

export default AddDateModal
