import { useState } from 'react'
import Input from '../components/Input'
import Layout from '../components/Layout'
import makeHash from '../helpers/makeHash'
import styles from './create.module.scss'

function Create() {
  const [eventName, setEventName] = useState('')
  const [eventNameTouched, setEventNameTouched] = useState(false)
  const [eventDesc, setEventDesc] = useState('')
  const [eventDescTouched, setEventDescTouched] = useState(false)

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
      <Input
        errorMessage='This field is required.'
        invalid={eventNameTouched && (eventName == '')}
        label='Event name'
        onChange={(event) => {
          setEventName(event.target.value)
          setEventNameTouched(true)
        }}
      />
      <Input
        errorMessage='This field is required.'
        invalid={eventDescTouched && (eventDesc == '')}
        label='Event description'
        multiline
        onChange={(event) => {
          setEventDesc(event.target.value)
          setEventDescTouched(true)
        }}
      />
    </Layout>
  )
}

export default Create
