import { useState } from 'react'
import DatePicker from 'react-datepicker'
import Button from '../components/Button'
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

  const [startDate, setStartDate] = useState(new Date());

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
        label='Event description'
        multiline
        onChange={(event) => {
          setEventDesc(event.target.value)
        }}
      />
      <Input
        errorMessage='A nickname is required. (Fakes welcome!)'
        invalid={nickTouched && (nick == '')}
        label='Your nickname'
        onChange={(event) => {
          setNick(event.target.value)
          setNickTouched(true)
        }}
      />
      <hr className={styles.separator} />
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <hr className={styles.separator} />
      <Button
        classes={styles.submitButton}
        label='Submit event'
      />
    </Layout>
  )
}

export default Create
