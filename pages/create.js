import { useEffect, useState } from 'react'
import AddDateModal from '../components/AddDateModal'
import Button from '../components/Button'
import CreateFail from '../components/Create/CreateFail'
import CreatePending from '../components/Create/CreatePending'
import CreateSuccess from '../components/Create/CreateSuccess'
import CreateDateOption from '../components/CreateDateOption'
import Hero from '../components/Hero'
import Input from '../components/Input'
import Layout from '../components/Layout'
import fetchPost from '../helpers/fetchPost'
import makeHash from '../helpers/makeHash'
import styles from './create.module.scss'

import 'react-datepicker/dist/react-datepicker.css'

function Create() {
  const [eventName, setEventName] = useState('')
  const [eventNameTouched, setEventNameTouched] = useState(false)
  const [eventDesc, setEventDesc] = useState('')
  const [nick, setNick] = useState('')
  const [nickTouched, setNickTouched] = useState(false)
  const [dates, setDates] = useState([])
  const [eventHash, setEventHash] = useState(null)
  const [organizerHash, setOrganizerHash] = useState(null)
  const [submitError, setSubmitError] = useState(null)
  const [resStatus, setResStatus] = useState(null)

  const pickerDateStarter = new Date();
  pickerDateStarter.setMinutes(0);
  pickerDateStarter.setSeconds(0);
  pickerDateStarter.setMilliseconds(0);
    
  const [pickerDate, setPickerDate] = useState(pickerDateStarter.getTime());
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (resStatus) return
    document.getElementById('event-name').value = eventName
    document.getElementById('event-description').value = eventDesc
    document.getElementById('organizer-nickname').value = nick
  })

  function deleteDate (dateEpoch) {
    const index = dates.indexOf(dateEpoch)
    if (index < 0) return
    const newDates = Array.from(dates)
    newDates.splice(index, 1)
    setDates(newDates.sort())
  }

  function submitForm () {
    setEventNameTouched(true)
    setNickTouched(true)

    // list of strings; later built into <li> components
    const errors = []

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
    const submitBody = {
      eventName,
      eventDesc,
      nick,
      dates,
      eventHash: makeHash(),
      organizerHash: makeHash(),
      isFinalized: false,
      expires: null
    }
    setEventHash(submitBody.eventHash)
    setOrganizerHash(submitBody.organizerHash)
    setResStatus('pending')

    fetchPost(submitBody, '/api/create', ((res) => {
      if (res.status == 500) {
        setResStatus('500')
        return
      }
      if (res.status == 200) {
        setResStatus('200')
        return
      }
      res.json().then(resJson => alert(JSON.stringify(resJson, null, 2)))
    }))
  }

  if (resStatus == 'pending')
    return <CreatePending />
  if (resStatus == '200')
    return <CreateSuccess eventHash={eventHash} organizerHash={organizerHash} />
  if (resStatus == '500') {
    return <CreateFail setResStatus={setResStatus} />
  }
  if (!resStatus) {
    return (
      <Layout>
        <Hero title='Create Event' />
        <hr className={styles.separator} />
        <Input
          errorMessage='An event name is required.'
          id='event-name'
          invalid={eventNameTouched && (eventName == '')}
          label='Event name'
          onChange={(event) => {
            setEventName(event.target.value)
            setEventNameTouched(true)
          }}
        />
        <Input
          id='event-description'
          label='Event description (optional)'
          multiline
          onChange={(event) => {
            setEventDesc(event.target.value)
          }}
        />
        <Input
          errorMessage='Nickname required. (Fakes welcome!)'
          id='organizer-nickname'
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
        <div className={styles.datesContainer}>
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
        {submitError && <p className={styles.submitError}>
          {submitError}
        </p>}
        <Button
          classes={styles.submitButton}
          label='Submit event'
          onClick={submitForm}
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
}

export default Create
