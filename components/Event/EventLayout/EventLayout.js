import { useLayoutEffect, useState } from 'react'
import clsx from 'clsx'
import Button from '../../Button'
import DateAnswer from '../../DateAnswers/DateAnswer'
import Input from '../../Input'
import Layout from '../../Layout'
import Modal from '../../Modal'
import Sharing from '../Sharing'
import Separator from '../../Separator'
import styles from './EventLayout.module.scss'
import ResponseRow from '../ResponseRow'
import fetchPost from '../../../helpers/fetchPost'
import dateStringsFromEpoch from '../../../helpers/dateStringsFromEpoch'
import isEmptyOrWhiteSpace from '../../../helpers/isEmptyOrWhiteSpace'
import makeHash from '../../../helpers/makeHash'

function ResponsePrompt () {
  return (
    <div>
      <p className={styles.userInputHint}>Your response:</p>
      <p className={styles.userInputExplanation}>Select all of the dates you can join the event!</p>
    </div>
  )
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
        classes={clsx(styles.updateButton)}
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
  const [modalContent, setModalContent] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [scrollLeft, setScrollLeft] = useState(null)
  const [scrollRight, setScrollRight] = useState(null)

  const isOrganizer = eventData.userId === userData?.userId
  const isFinalized = !!eventData.finalizedDate

  useLayoutEffect(() => {
    function styleAnswers () {
      const answers = document.getElementById('user-answers').scrollWidth
      const container = document.getElementById('guests-container').clientWidth
      const rows = document.querySelectorAll('.date-answers-row-scroll')
      if (answers > container) {
        rows.forEach(row => row.style.justifyContent = 'unset')
      } else {
        rows.forEach(row => row.style.justifyContent = 'center')
      }
      handleScroll(rows[0])
    }
    window.addEventListener('resize', styleAnswers)
    styleAnswers()
    return () => window.removeEventListener('resize', styleAnswers)
  }, [])

  function handleScrollEvent(event) {
    handleScroll(event.target)
  }

  function handleScroll(target) {
    const leftScrollGap = target.scrollLeft;
    const rightScrollGap = target.scrollWidth - target.clientWidth - target.scrollLeft;

    if (leftScrollGap > 0 && rightScrollGap > 0) {
      setScrollLeft(styles.scrollIndicatorLeft)
      setScrollRight(styles.scrollIndicatorRight)
    }
    else if (leftScrollGap > 0) {
      setScrollLeft(styles.scrollIndicatorLeft)
      setScrollRight(null)
    }
    else if (rightScrollGap > 0) {
      setScrollLeft(null)
      setScrollRight(styles.scrollIndicatorRight)
    }
    else {
      setScrollLeft(null)
      setScrollRight(null)
    }

    const rows = document.getElementsByClassName('date-answers-row-scroll')
    for(let i = 0; i < rows.length; i++) {
      rows[i].scrollLeft = target.scrollLeft
    }
  }

  function submitUserAnswers() {
    setUserNickTouched(true)

    if (isEmptyOrWhiteSpace(userNick)) return
    
    eventData.dates.forEach(date => {
      if (!userResponses.hasOwnProperty(date.toString())) userResponses[date] = false
    })

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
        setModalContent(<p className={styles.modalMessage}>
          There was an error somewhere <em>behind the curtain</em>.  Please try again . . .
        </p>)
        setModalOpen(true)
        return
      }
      if (res.status == 200) {
        const newUrl = `https://skedge.pro/event/${submitBody.eventId}/${submitBody.userId}`
        setModalContent(<div>
          <p className={styles.submitSuccess}>Success!!</p>
          <p className={styles.modalMessage}>You can <span className='highlight'>review or change</span> your submission as <span className='textLink'>{userNick}</span> by using the following link.</p>
          <p className={styles.dontLoseIt}>(Don't lose it!)</p>
          <Input
            containerClasses={styles.copyableInput}
            id='copy-button'
            readOnly
            value={newUrl}
          />
          <Button
            alternateLabel='Copied!'
            classes={styles.copyLinkButton}
            label='Copy link'
            onClick={(event) => {
              const input = document.getElementById('copy-button')
              input.select()
              input.setSelectionRange(0, 1000)
              if (!navigator.clipboard) {
                document.execCommand('copy')
              } else {
                navigator.clipboard.writeText(input.value)
              }
              event.stopPropagation();
            }}
          />
        </div>)
        setModalOpen(true)
        return
      }
    }))
  }

  function getDateAnswers(
    responseObject,
    clickable,
    isOrganizer,
    confirmFinalization,
    isFinalized,
    finalizable,
  ) {
    return eventData.dates.map((date, index) => <DateAnswer
      alternateColor={index % 2 === 0}
      clickable={clickable}
      confirmFinalization={confirmFinalization}
      date={date}
      finalizable={finalizable}
      hasTime={eventData.hasTime}
      isFinalized={isFinalized}
      isOrganizer={isOrganizer}
      key={index}
      response={responseObject[date]}
      setUserResponses={setUserResponses}
      userResponses={responseObject}
    />
  )}

  function confirmFinalization(date) {
    const {dateString, timeString} = dateStringsFromEpoch(date)
    const eventTimeString = eventData.hasTime ? `${dateString} at ${timeString}` : dateString
    setModalContent(<div>
      <p className={styles.submitSuccess}>Confirm</p>
      <p className={styles.modalMessage}>Are you sure you want to finalize the date for your event as</p>
      <p className={clsx(styles.modalMessage, 'highlight')}>{eventTimeString}?</p>
      <Button
        alternateLabel='Confirmed'
        classes={styles.copyLinkButton}
        label='Confirm?'
        onClick={(event) => {
          const updatedEventData = {
            ...eventData,
            finalizedDate: date,
          }
          fetchPost(updatedEventData, '/api/update-event', ((res) => {
            if (res.status == 500) {
              setModalContent(<p className={styles.modalMessage}>
                There was an error finalizing the event.  Please try again . . .
              </p>)
              setModalOpen(true)
            } else if (res.status == 200) {
              window.location.reload()
            } else {
              setModalContent(<p className={styles.modalMessage}>
                An unknown error occurred finalizing the event.  Please try again . . .
              </p>)
              setModalOpen(true)
            }
          }))
          setModalOpen(false)
          event.stopPropagation();
        }}
      />
    </div>)
    setModalOpen(true)
  }
  
  const guestComponents = []
  guestsData.forEach((guest, index) => {
    // check if this is the current user
    const isActiveUser = userData && userData.userId == guest.userId

    // Render components for active user
    if (isActiveUser) {
      if (index > 0) guestComponents.unshift(<hr className={styles.rowSeparator} key={`hr-${index}`} />)
      guestComponents.unshift(
        <ResponseRow
          dateAnswerPairs={getDateAnswers(userResponses, true, isOrganizer, confirmFinalization, isFinalized, true)}
          idString='user-answers'
          key={`user-answers-${index}`}
          rowStyle={styles.userAnswers}
          scrollHandler={handleScrollEvent}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
        />
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
      if (index > 0) guestComponents.push(<hr className={styles.rowSeparator} key={`guest-separator-${index}`} />)
      guestComponents.push(
        <p className={styles.nickname} key={`nickname-${index}`}>
          {guest.nickname}
        </p>
      )
      guestComponents.push(
        <ResponseRow
          dateAnswerPairs={getDateAnswers(guest.responses, false, isOrganizer)}
          key={`answers-${index}`}
          rowStyle={styles.answers}
          scrollHandler={handleScrollEvent}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
        />
      )
    }
  })
  // Render input row in case user is new
  if (!userData) {
    guestComponents.unshift(<hr className={styles.rowSeparator} key={`new-user-separator`} />)
    guestComponents.unshift(
      <ResponseRow
        dateAnswerPairs={getDateAnswers(userResponses, true, isOrganizer)}
        idString='user-answers'
        key={`new-user-answers`}
        rowStyle={styles.userAnswers}
        scrollHandler={handleScrollEvent}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
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

  return (
    <Layout eventPage showLogo>
      <div className={styles.layoutContent}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{eventData.eventName}{isFinalized && ` (Finalized)`}</h1>
          {isOrganizer && <p className={styles.organizerTitle}>This is your event.</p>}
          {!isOrganizer && eventData.nick &&
            <p className={styles.organizerTitle}>by {eventData.nick}</p>
          }
          <p className={styles.description}>{eventData.eventDesc}</p>
          <Sharing
            eventId={eventData?.eventId}
            isOrganizer={isOrganizer}
            userId={userData?.userId}
          />
          <Separator />
        </div>
        <div className={styles.guestsContainer} id='guests-container'>
          {guestComponents}
        </div>
        <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
          {modalContent}
        </Modal>
      </div>
    </Layout>
  )
}

export default EventLayout
