import { useState } from 'react'
import Input from '../components/Input'
import Layout from '../components/Layout'
import makeHash from '../helpers/makeHash'
import styles from './create.module.scss'

function Create() {
  const [eventName, setEventName] = useState('')
  const [eventTouched, setEventTouched] = useState(false)

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
        invalid={eventTouched && (eventName == '')}
        label='Event name'
        onChange={(event) => {
          setEventName(event.target.value)
          setEventTouched(true)
        }}
      />
    </Layout>
  )
}

export default Create
