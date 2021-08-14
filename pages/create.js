import { useState } from 'react'
import AddDateModal from '../components/AddDateModal'
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
  const [modalOpen, setModalOpen] = useState(false)

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
        Add any number of times for your event.
      </p>
      <Button
        classes={styles.addDateButton}
        label='Add date'
        onClick={() => {
          // This is hacky because react-datepicker is glitchy
          if (window.matchMedia('min-width: 600px').matches) {
            window.scrollTo(window.scrollX, 400)
            if (window.scrollY < 400) window.scrollTo(window.scrollX, 10)
          } else {
            window.scrollTo(window.scrollX, 0)
            window.scrollTo(window.scrollX, 340)
          }
          setModalOpen(true)
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
      <div className={styles.dateGrid}>
        {dates.map((date) => {
          return (
            <CreateDateOption
              dateEpoch={date}
              deleteFn={deleteDate}
              key={date}
            />
          )
        })}
      </div>
      <hr className={styles.separator} />
      <Button
        classes={styles.submitButton}
        label='Submit event'
        onClick={() => alert('submit clicked')}
      />
      <AddDateModal
        closeModal={() => setModalOpen(false)}
        dates={dates}
        open={modalOpen}
        pickerDate={pickerDate}
        setDates={setDates}
        setPickerDate={setPickerDate}
      />      
    </Layout>
  )
}

export default Create
