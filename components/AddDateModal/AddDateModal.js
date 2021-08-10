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
        <DatePicker
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={(date) => setPickerDate(date.getTime())}
          open
          popperPlacement='top-start'
          selected={pickerDate}
          shouldCloseOnSelect={false}
          showTimeSelect
          startOpen
        />
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
