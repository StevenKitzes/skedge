import clsx from 'clsx'
import DatePicker from 'react-datepicker'
import Button from '../Button'
import styles from './AddDateModal.module.scss'

function AddDateModal({ closeModal, dates, hasTime, open, pickerDate, setDates, setPickerDate }) {
  return (
    <div
      className={clsx(styles.backing, !open && styles.hidden)}
    >
      <div id='modal' className={styles.modal}>
        <DatePicker
          dateFormat="MMMM d, yyyy"
          inline
          onChange={(date) => {
            // remove time data from date if !hasTime
            if (!hasTime) {
              date.setHours(0,0,0,0)
            }

            setPickerDate(date.getTime())
          }}
          popperPlacement='top-start'
          selected={pickerDate}
          shouldCloseOnSelect={false}
        />
        {hasTime && <select className={styles.timeSelect} id='time'>
          <option value='' disabled selected>Select a time</option>
          <option value='0,00'>12:00 AM</option>
          <option value='0,30'>12:30 AM</option>
          <option value='1,00'>1:00 AM</option>
          <option value='1,30'>1:30 AM</option>
          <option value='2,00'>2:00 AM</option>
          <option value='2,30'>2:30 AM</option>
          <option value='3,00'>3:00 AM</option>
          <option value='3,30'>3:30 AM</option>
          <option value='4,00'>4:00 AM</option>
          <option value='4,30'>4:30 AM</option>
          <option value='5,00'>5:00 AM</option>
          <option value='5,30'>5:30 AM</option>
          <option value='6,00'>6:00 AM</option>
          <option value='6,30'>6:30 AM</option>
          <option value='7,00'>7:00 AM</option>
          <option value='7,30'>7:30 AM</option>
          <option value='8,00'>8:00 AM</option>
          <option value='8,30'>8:30 AM</option>
          <option value='9,00'>9:00 AM</option>
          <option value='9,30'>9:30 AM</option>
          <option value='10,00'>10:00 AM</option>
          <option value='10,30'>10:30 AM</option>
          <option value='11,00'>11:00 AM</option>
          <option value='11,30'>11:30 AM</option>
          <option value='12,00'>12:00 PM</option>
          <option value='12,30'>12:30 PM</option>
          <option value='13,00'>1:00 PM</option>
          <option value='13,30'>1:30 PM</option>
          <option value='14,00'>2:00 PM</option>
          <option value='14,30'>2:30 PM</option>
          <option value='15,00'>3:00 PM</option>
          <option value='15,30'>3:30 PM</option>
          <option value='16,00'>4:00 PM</option>
          <option value='16,30'>4:30 PM</option>
          <option value='17,00'>5:00 PM</option>
          <option value='17,30'>5:30 PM</option>
          <option value='18,00'>6:00 PM</option>
          <option value='18,30'>6:30 PM</option>
          <option value='19,00'>7:00 PM</option>
          <option value='19,30'>7:30 PM</option>
          <option value='20,00'>8:00 PM</option>
          <option value='20,30'>8:30 PM</option>
          <option value='21,00'>9:00 PM</option>
          <option value='21,30'>9:30 PM</option>
          <option value='22,00'>10:00 PM</option>
          <option value='22,30'>10:30 PM</option>
          <option value='23,00'>11:00 PM</option>
          <option value='23,30'>11:30 PM</option>
        </select>}
        <Button
          classes={styles.button}
          label='Cancel'
          onClick={closeModal}
          variant='outlined'
        />
        <Button
          alternateLabel='Pick a time'
          classes={styles.button}
          label='Select'
          onClick={() => {
            if (hasTime) {
              // if hasTime but no time selected, reject selection
              if (document.getElementById('time').value == '') {
                return
              }
              const selectedTimeValue = document.getElementById('time').value.split(',')
              const date = new Date(pickerDate)
              date.setHours(selectedTimeValue[0])
              date.setMinutes(selectedTimeValue[1])
              const epoch = date.getTime()
              if (!dates.includes(epoch)) setDates([...dates, epoch].sort())
              return closeModal()
            }

            // if !hasTime, then default this epoch's time to flat 0 for purposes of dupe detection
            const tempDate = new Date(pickerDate)
            tempDate.setHours(0,0,0,0)
            const tempEpoch = tempDate.getTime()

            if (!dates.includes(tempEpoch)) setDates([...dates, tempEpoch].sort())
            closeModal()
          }}
        />
      </div>
    </div>
  )
}

export default AddDateModal
