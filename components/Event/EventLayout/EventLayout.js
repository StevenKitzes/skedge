import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Button from '../../Button'
import DateAnswersHeader from '../../DateAnswers/DateAnswersHeader'
import DateAnswerPair from '../../DateAnswers/DateAnswerPair'
import Input from '../../Input'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLayout.module.scss'
import fetchPost from '../../../helpers/fetchPost'
import isEmptyOrWhiteSpace from '../../../helpers/isEmptyOrWhiteSpace'
import makeHash from '../../../helpers/makeHash'

function ResponsePrompt () {
  return <p className={styles.userNickInputHint}>Your response:</p>
}

function UserControls ({ newUser, setUserNick, setUserNickTouched, submit, userNick, userNickTouched }) {
  return (
    <div className={styles.userControlsContainer}>
      <Input
        classes={styles.userNickInput}
        containerClasses={styles.userNickInputContainer}
        id='date-answers-nick'
        invalid={userNickTouched && isEmptyOrWhiteSpace(userNick)}
        onChange={(event) => {
          setUserNick(event.target.value)
          setUserNickTouched(true)
        }}
        placeholder='Nickname required'
        value={userNick}
      />
      <Button
        classes={styles.button}
        label={newUser ? 'Share' : 'Update'}
        onClick={submit}
      />
    </div>
  )
}

function EventLayout ({ eventData, guestsData, userData }) {
  const [userNick, setUserNick] = useState(userData && userData.nickname || '')
  const [userNickTouched, setUserNickTouched] = useState(false)
  const [userResponses, setUserResponses] = useState(userData && userData.responses || {})

  const specialCenteringHack = eventData.dates.length < 5

  useEffect(() => {
    const header = document.getElementById('header-container')
    const guests = document.getElementById('guests-container')
    const diff = header.clientWidth - guests.clientWidth
    if (diff > 0) {
      header.style.marginRight = `${diff}px`
    }
  })

  function handleScroll(event) {
    const header = document.getElementById('date-answers-header-scroll')
    const rows = document.getElementsByClassName('date-answers-row-scroll')
    header.scrollLeft = event.target.scrollLeft
    for(let i = 0; i < rows.length; i++) {
      rows[i].scrollLeft = event.target.scrollLeft
    }
  }

  function submitUserAnswers() {
    setUserNickTouched(true)

    if (isEmptyOrWhiteSpace(userNick)) return
    
    let hasAllDates = true
    eventData.dates.forEach(date => {
      if (!userResponses.hasOwnProperty(date.toString())) hasAllDates = false
    })
    if (!hasAllDates) {
      alert('must answer for all dates')
      return
    }

    const newUserHash = makeHash()

    const submitBody = {
      eventId: eventData.eventId,
      userId: userData ? userData.userId : newUserHash,
      nickname: userNick,
      responses: userResponses,
      comments: '',
      expires: eventData.expires
    }
    fetchPost(submitBody, '/api/post-user', ((res) => {
      if (res.status == 500) {
        alert('error 500')
        return
      }
      if (res.status == 200) {
        const newUrl = `https://skedge.pro/event/${submitBody.eventId}/${submitBody.userId}`
        alert(`success! you can now review as ${userNick} at ${newUrl}`)
        return
      }
    }))
  }

  function getResponseList(guestResponseObject) {
    const responses = []
    eventData.dates.forEach(date => {
      if (!guestResponseObject.hasOwnProperty(date.toString()))
        responses.push(-1)
      else if (guestResponseObject[date] === 1)
        responses.push(1)
      else if (guestResponseObject[date] === 0)
        responses.push(0)
      else
        responses.push(-1)
    })
    return responses
  }

  const guestComponents = []
  guestsData.forEach((guest, index) => {
    // check if this is the current user
    const isActiveUser = userData && userData.userId == guest.userId

    // Render components for active user
    if (isActiveUser) {
      const responses = getResponseList(userResponses)

      if (index > 0) guestComponents.unshift(<hr className={styles.rowSeparator} key={`hr-${index}`} />)
      guestComponents.unshift(
        <div
          className={clsx(styles.userAnswers, 'date-answers-row-scroll', specialCenteringHack && styles.justifyCenter)}
          key={`user-answers-${index}`}
          onScroll={handleScroll}
        >
          {eventData.dates.map((date, index) => {
            return <DateAnswerPair
              alternateColor={index % 2 === 0}
              date={date}
              key={index}
              response={responses[index]}
              setUserResponses={setUserResponses}
              userResponses={userResponses}
            />
          })}
        </div>
      )
      guestComponents.unshift(
        <UserControls
          key='user-controls'
          newUser={!!!userData}
          setUserNick={setUserNick}
          setUserNickTouched={setUserNickTouched}
          submit={submitUserAnswers}
          userNick={userNick}
          userNickTouched={userNickTouched}
        />
      )
      guestComponents.unshift(<ResponsePrompt key='hint' />)
    // Render components for other guests
    } else {
      const responses = getResponseList(guest.responses)

      if (index > 0) guestComponents.push(<hr className={styles.rowSeparator} key={`guest-separator-${index}`} />)
      guestComponents.push(
        <p className={styles.nickname} key={`nickname-${index}`}>
          {guest.nickname}
        </p>
      )
      guestComponents.push(
        <div
          className={clsx(styles.answers, 'date-answers-row-scroll')}
          key={`answers-${index}`}
          onScroll={handleScroll}
        >
          {responses.map((response, index) => <DateAnswerPair alternateColor={index % 2 === 0} key={index} response={response} />)}
        </div>
      )
    }
  })
  // Render input row in case user is new
  if (!userData) {
    const responses = getResponseList(userResponses)

    guestComponents.unshift(<hr className={styles.rowSeparator} key={`new-user-separator`} />)
    guestComponents.unshift(
      <div
        className={clsx(styles.userAnswers, 'date-answers-row-scroll', specialCenteringHack && styles.justifyCenter)}
        key={`new-user-answers`}
        onScroll={handleScroll}
      >
        {eventData.dates.map((date, index) => {
          return <DateAnswerPair
            alternateColor={index % 2 === 0}
            date={date}
            key={index}
            response={responses[index]}
            setUserResponses={setUserResponses}
            userResponses={userResponses}
          />
        })}
      </div>
    )
    guestComponents.unshift(
      <UserControls
        key='user-controls'
        newUser={!!!userData}
        setUserNick={setUserNick}
        setUserNickTouched={setUserNickTouched}
        submit={submitUserAnswers}
        userNick={userNick}
        userNickTouched={userNickTouched}
      />
    )
    guestComponents.unshift(<ResponsePrompt key='hint' />)
  }
  guestComponents.unshift(<hr className={styles.rowSeparator} key="final-separator" />)

  return (
    <Layout eventPage showLogo>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{eventData.eventName}</h1>
        {eventData.nick &&
          <p className={styles.organizerNick}>by {eventData.nick}</p>
        }
        <p className={styles.description}>{eventData.eventDesc}</p>
        <Separator />
      </div>
      <DateAnswersHeader classes={styles.headerContainer} dates={eventData.dates} handleScroll={handleScroll} />
      <div className={styles.guestsContainer} id='guests-container'>
        {guestComponents}
      </div>
    </Layout>
  )
}

export default EventLayout
