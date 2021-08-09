import { useState } from 'react'
import DatePicker from 'react-datepicker'
import Button from '../components/Button'
import CreateDateOption from '../components/CreateDateOption'
import Input from '../components/Input'
import Layout from '../components/Layout'
import makeHash from '../helpers/makeHash'
import styles from './create.module.scss'

import "react-datepicker/dist/react-datepicker.css";

function Create() {
  const [eventName, setEventName] = useState('')
  const [eventNameTouched, setEventNameTouched] = useState(false)
  const [eventDesc, setEventDesc] = useState('')
  const [nick, setNick] = useState('')
  const [nickTouched, setNickTouched] = useState(false)
  const [dates, setDates] = useState([])

  const pickerDateStarter = new Date();
  pickerDateStarter.setMinutes(0);
  pickerDateStarter.setSeconds(0);
  pickerDateStarter.setMilliseconds(0);
    
  const [pickerDate, setPickerDate] = useState(pickerDateStarter.getTime());

  function deleteDate (dateEpoch) {
    const index = dates.indexOf(dateEpoch)
    if (index < 0) return
    const newDates = Array.from(dates)
    newDates.splice(index, 1)
    setDates(newDates.sort())
  }

  return (
    <Layout>
      <img
        alt='Skedge'
        className={styles.logo}
        src='../images/skedge-logo-outline.svg'
      />
      <h1 className={styles.title}>
        Create Event
      </h1>

      <hr className={styles.separator} />
      <Input
        errorMessage='An event name is required.'
        invalid={eventNameTouched && (eventName == '')}
        label='Event name'
        onChange={(event) => {
          setEventName(event.target.value)
          setEventNameTouched(true)
        }}
      />
      <Input
        label='Event description (optional)'
        multiline
        onChange={(event) => {
          setEventDesc(event.target.value)
        }}
      />
      <Input
        errorMessage='Nickname required. (Fakes welcome!)'
        invalid={nickTouched && (nick == '')}
        label='Your nickname'
        onChange={(event) => {
          setNick(event.target.value)
          setNickTouched(true)
        }}
      />

      <hr className={styles.separator} />
      <p className={styles.selectInstructions}>
        Add any number of date/time pairs for your event.
      </p>
      <DatePicker
        dateFormat="MMMM d, yyyy h:mm aa"
        onChange={(date) => setPickerDate(date.getTime())}
        selected={pickerDate}
        showTimeSelect
      />
      <Button
        classes={styles.addDateButton}
        label='Add date'
        onClick={() => {
          if (!dates.includes(pickerDate)) setDates([...dates, pickerDate].sort())
        }}
        variant='outlined'
      />

      <hr className={styles.separator} />
      <p className={styles.picked}>Dates picked so far:</p>
      {dates.length < 1 &&
        <p className={styles.noDates}>
          No dates picked.  You must pick at least one date!
        </p>
      }
      {dates.map((date) => {
        return (
          <CreateDateOption
            dateEpoch={date}
            deleteFn={deleteDate}
          />
        )
      })}

      <hr className={styles.separator} />
      <Button
        classes={styles.submitButton}
        label='Submit event'
        onClick={() => alert('submit clicked')}
      />
    </Layout>
  )
}

export default Create
