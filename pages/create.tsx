import { useEffect, useState } from 'react'
import Head from 'next/head'

import 'react-datepicker/dist/react-datepicker.css'

import AddDateModal from '../components/AddDateModal'
import Button from '../components/Button'
import CreateFail from '../components/Create/CreateFail'
import CreatePending from '../components/Create/CreatePending'
import CreateDateOption from '../components/CreateDateOption'
import Hero from '../components/Hero'
import Input from '../components/Input'
import Layout from '../components/Layout'
import Separator from '../components/Separator'
import type { FetchOptions} from '../types/FetchOptions'
import isEmptyOrWhiteSpace from '../helpers/isEmptyOrWhiteSpace'
import makeHash from '../helpers/makeHash'
import styles from './create.module.scss'

import { EventShape } from '../helpers/db'

function Create(): JSX.Element | undefined {
  const [eventName, setEventName] = useState<string>('')
  const [eventNameTouched, setEventNameTouched] = useState<boolean>(false)
  const [eventDesc, setEventDesc] = useState<string>('')
  const [nick, setNick] = useState<string>('')
  const [nickTouched, setNickTouched] = useState<boolean>(false)
  const [dates, setDates] = useState<number[]>([])
  const [eventId, setEventId] = useState<string | null>(null)
  const [userId, setOrganizerId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<JSX.Element | null>(null)
  const [resStatus, setResStatus] = useState<string | null>(null)
  const [hasTime, setHasTime] = useState<boolean>(false)

  const pickerDateStarter = new Date();
  pickerDateStarter.setMinutes(0);
  pickerDateStarter.setSeconds(0);
  pickerDateStarter.setMilliseconds(0);
    
  const [pickerDate, setPickerDate] = useState<number>(pickerDateStarter.getTime());
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (resStatus) return

    const eventNameElement = document.getElementById('event-name') as HTMLInputElement | null
    const eventDescElement = document.getElementById('event-description') as HTMLInputElement | null
    const organizerNickElement = document.getElementById('organizer-nickname') as HTMLInputElement | null

    if (eventNameElement === null || eventDescElement === null || organizerNickElement === null) {
      throw new Error('A critical HTML element was missing from the document model.')
    }

    eventNameElement.value = eventName
    eventDescElement.value = eventDesc
    organizerNickElement.value = nick
  })

  function deleteDate (dateEpoch: number): void {
    const index: number = dates.indexOf(dateEpoch)
    if (index < 0) return
    const newDates: number[] = Array.from(dates)
    newDates.splice(index, 1)
    setDates(newDates.sort())
  }

  function submitForm () {
    setEventNameTouched(true)
    setNickTouched(true)

    // list of strings; later built into <li> components
    const errors: string[] = []

    if (!eventName || !eventName.trim()) {
      errors.push('An event name is required.')
    }
    if (!nick || !nick.trim()) {
      errors.push('Nickname required. (Fakes welcome!)')
    }
    if (dates.length < 1) {
      errors.push('No dates picked.  You must pick at least one date!')
    }

    if (errors.length >= 1) {
      setSubmitError(<ul className={styles.submitErrorList}>
        <p className={styles.submitErrorNote}>Submit errors found:</p>
        {errors.map((err) => <li className={styles.submitErrorListItem} key={err}>
          {err}
        </li>)}
      </ul>)
      return
    }

    setSubmitError(null)
    const submitBody: EventShape = {
      eventName,
      eventDesc,
      nick,
      dates,
      hasTime,
      eventId: makeHash(),
      userId: makeHash(),
      finalizedDate: null,
      expires: null
    }
    setEventId(submitBody.eventId)
    setOrganizerId(submitBody.userId)
    setResStatus('pending')

    const fetchOptions: FetchOptions = {
      method: 'POST',
      body: JSON.stringify(submitBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/create', fetchOptions)
      .then(res => {
        if (res.status == 200) setResStatus('200')
        else setResStatus('500')
      })
  }

  if (resStatus == 'pending')
    return <CreatePending />
  if (resStatus == '200') {
    window.location.href = `//${window.location.host}/event/${eventId}/${userId}?status=new`
    return
  }
  if (resStatus == '500') {
    return <CreateFail setResStatus={setResStatus} />
  }
  if (!resStatus) {
    const seoTitle = `Create Skedge Event${eventName ? `: ${eventName}` : ''}`
    return (
      <Layout>
        <Head>
          <title>{seoTitle}</title>
          <link rel="icon" href="https://skedge.pro/favicon.ico" />
          <meta name="description" content="Provide the basic information needed to create your Skedge event and its voting options." />
          <meta name="keywords" content="skedge, skedge.pro, create, schedule, scheduler, scheduling, schedule tool, scheduler tool, scheduling tool, organize schedule, organize scheduling, social scheduling tool, free scheduler, productivity tool, online scheduler, online scheduling, efficient scheduling" />
          <meta name="author" content="Steven Kitzes" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content="Provide the basic information needed to create your Skedge event and its voting options." />
          <meta property="og:image" content="https://skedge.pro/images/og-image.png" />
          <meta property="og:url" content="https://skedge.pro/create" />
          <meta property="og:type" content="website" />
        </Head>
        <Hero title='Create Event' />
        <Separator />
        <Input
          errorMessage='An event name is required.'
          id='event-name'
          invalid={eventNameTouched && isEmptyOrWhiteSpace(eventName)}
          label='Event name'
          onChange={(event) => {
            setEventName((event.target as HTMLInputElement).value)
            setEventNameTouched(true)
          }}
        />
        <Input
          id='event-description'
          label='Event description (optional)'
          multiline
          onChange={(event) => {
            setEventDesc((event.target as HTMLInputElement).value)
          }}
        />
        <Input
          errorMessage='Nickname required. (Fakes welcome!)'
          id='organizer-nickname'
          invalid={nickTouched && isEmptyOrWhiteSpace(nick)}
          label='Your nickname'
          onChange={(event) => {
            setNick((event.target as HTMLInputElement).value)
            setNickTouched(true)
          }}
        />
  
        <Separator />
        <p className={styles.info}>
          Add any number of dates for your event.
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
        <p className={styles.specifyTimes}>
          Specify time of day?
          <input
            checked={hasTime}
            className={styles.checkbox}
            id='has-time'
            onChange={() => {
              // if we are *un*checking hasTime
              if (hasTime) {
                // remove duplicate dates since we will be disregarding time of day
                const newDates: number[] = []
                dates.forEach(epoch => {
                  const date = new Date(epoch)
                  // set selected dates' times to flat 0; we no longer track time; eases dupe detection too
                  date.setHours(0,0,0,0)
                  const time = date.getTime()
                  if (!newDates.includes(time)) newDates.push(time)
                })
                setDates(newDates)
              }
              setHasTime(!hasTime)
            }}
            type='checkbox'
          />
        </p>
  
        <Separator />
        <p className={styles.info}>Dates picked so far:</p>
        {dates.length < 1 &&
          <p className={styles.noDates}>
            No dates picked.  You must pick at least one date!
          </p>
        }
        <div className={styles.datesContainer}>
          {dates.map((date) => {
            return (
              <CreateDateOption
                dateEpoch={date}
                deleteFn={deleteDate}
                hasTime={hasTime}
                key={date}
              />
            )
          })}
        </div>
        <Separator />
        {submitError && <p className={styles.submitError}>
          {submitError}
        </p>}
        <p className={styles.info}>Note, events expire after 1 month!</p>
        <Button
          classes={styles.submitButton}
          label='Submit event'
          onClick={submitForm}
        />
        <AddDateModal
          closeModal={() => setModalOpen(false)}
          dates={dates}
          hasTime={hasTime}
          open={modalOpen}
          pickerDate={pickerDate}
          setDates={setDates}
          setPickerDate={setPickerDate}
        />      
      </Layout>
    )
  }
}

export default Create
