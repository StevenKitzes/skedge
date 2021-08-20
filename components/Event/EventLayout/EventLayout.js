import { useState } from 'react'
import clsx from 'clsx'
import Button from '../../Button'
import DateAnswersHeader from '../../DateAnswers/DateAnswersHeader'
import DateAnswerPair from '../../DateAnswers/DateAnswerPair'
import Input from '../../Input'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLayout.module.scss'
import isEmptyOrWhiteSpace from '../../../helpers/isEmptyOrWhiteSpace'

function ResponsePrompt () {
  return <p className={styles.userNickInputHint}>Your response:</p>
}

function UserControls ({ setUserNick, setUserNickTouched, userNick, userNickTouched }) {
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
        label='Update'
        onClick={() => alert(`submit answers not yet implemented`)}
      />
    </div>
  )
}

function EventLayout ({ eventData, guestsData, userData }) {
  const [userNick, setUserNick] = useState(userData && userData.nickname || '')
  const [userNickTouched, setUserNickTouched] = useState(false)
  const [userResponses, setUserResponses] = useState({})

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

    const responses = getResponseList(guest.responses)

    // Render components for active user
    if (isActiveUser) {
      if (index > 0) guestComponents.unshift(<hr className={styles.rowSeparator} key={`hr-${index}`} />)
      guestComponents.unshift(
        <div
          className={clsx(styles.userAnswers, 'date-answers-row-scroll')}
          key={`user-answers-${index}`}
          onScroll={handleScroll}
        >
          {responses.map((response, index) => {
            <DateAnswerPair
              alternateColor={index % 2 === 0}
              date={dates[index]}
              key={index}
              response={response}
              setUserResponses={setUserResponses}
              userResponses={userResponses}
            />
          })}
        </div>
      )
      guestComponents.unshift(
        <UserControls
          key='user-controls'
          setUserNick={setUserNick}
          setUserNickTouched={setUserNickTouched}
          userNick={userNick}
          userNickTouched={userNickTouched}
        />
      )
      guestComponents.unshift(<ResponsePrompt key='hint' />)
    // Render components for other guests
    } else {
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
        className={clsx(styles.userAnswers, 'date-answers-row-scroll')}
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
        setUserNick={setUserNick}
        setUserNickTouched={setUserNickTouched}
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
      <div className={styles.guestsContainer}>
        {guestComponents}
      </div>
    </Layout>
  )
}

export default EventLayout
