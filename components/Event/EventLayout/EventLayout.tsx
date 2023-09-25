import React, { useLayoutEffect, useState } from 'react'

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
import dateStringsFromEpoch from '../../../helpers/dateStringsFromEpoch'
import isEmptyOrWhiteSpace from '../../../helpers/isEmptyOrWhiteSpace'
import makeHash from '../../../helpers/makeHash'
import { EventShape, UserShape } from '../../../helpers/db'
import { getPopularList } from '../../../helpers/getPopularList'

import type { FetchOptions } from '../../../types/FetchOptions'
import Head from 'next/head'

type ResponsePromptProps = {
  isFinalized: boolean,
}
type UserControlsProps = {
  isFinalized: boolean,
  newUser: boolean,
  setUserNick: (v: string) => void,
  setUserNickTouched: (v: boolean) => void,
  submit: () => void,
  userNick: string,
  userNickTouched: boolean,
}
type EventLayoutProps = {
  eventData: EventShape,
  guestsData: UserShape[],
  userData?: UserShape | null,
}

function ResponsePrompt ({ isFinalized }: ResponsePromptProps): JSX.Element | null {
  return isFinalized ? null : (
    <div>
      <p className={styles.userInputHint}>Your response:</p>
      <p className={styles.userInputExplanation}>Select all of the dates you can join the event!</p>
    </div>
  )
}

function UserControls ({ isFinalized, newUser, setUserNick, setUserNickTouched, submit, userNick, userNickTouched }: UserControlsProps): JSX.Element {
  if (isFinalized) {
    return (
      <p className={styles.nickname} key={`nickname-user`}>
        {userNick}
      </p>
    )
  }
  return (
    <div className={styles.userControlsContainer}>
      <Input
        classes={styles.userNickInput}
        containerClasses={styles.userNickInputContainer}
        id='date-answers-nick'
        invalid={userNickTouched && isEmptyOrWhiteSpace(userNick)}
        onChange={(event) => {
          const target: HTMLInputElement = event.target as HTMLInputElement
          setUserNick(target.value)
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

function EventLayout ({ eventData, guestsData, userData }: EventLayoutProps): JSX.Element {
  const [userNick, setUserNick] = useState<string>(userData && userData.nickname || '')
  const [userNickTouched, setUserNickTouched] = useState<boolean>(false)
  const [userResponses, setUserResponses] = useState<{[key: string]: boolean}>((userData && userData.responses) ? userData.responses : {})
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [scrollLeft, setScrollLeft] = useState<string | null>(null)
  const [scrollRight, setScrollRight] = useState<string | null>(null)

  const isOrganizer = eventData.userId === userData?.userId
  const isFinalized = !!eventData.finalizedDate
  const finalizedDate = eventData.finalizedDate

  const popularList: number[] = getPopularList(eventData.dates, guestsData.map(guest => guest.responses))

  useLayoutEffect(() => {
    function styleAnswers () {
      const answersElement: HTMLDivElement = document.getElementById('answers-row') as HTMLDivElement
      const containerElement: HTMLDivElement = document.getElementById('guests-container') as HTMLDivElement
      if (answersElement === null || containerElement === null) {
        throw new Error('Crucial user interface components were not found.')
      }
      const answers = answersElement.scrollWidth
      const container = containerElement.clientWidth
      
      const rows: NodeListOf<HTMLDivElement> = document.querySelectorAll('.date-answers-row-scroll')
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

  function handleScrollEvent(event: React.UIEvent): void {
    handleScroll(event.target as HTMLDivElement)
  }

  function handleScroll(target: HTMLDivElement): void {
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

  function submitUserAnswers(): void {
    setUserNickTouched(true)

    if (isEmptyOrWhiteSpace(userNick)) return

    const isUserNew = !(!!userData)
    
    eventData.dates.forEach(date => {
      if (!userResponses.hasOwnProperty(date.toString())) userResponses[date] = false
    })

    const newUserHash: string = makeHash()

    const submitBody: UserShape = {
      eventId: eventData.eventId,
      userId: isUserNew ? newUserHash : userData.userId,
      nickname: userNick,
      responses: userResponses,
      comments: '',
      expires: eventData.expires
    }
    const postUserFetchOptions: FetchOptions = {
      method: 'POST',
      body: JSON.stringify(submitBody),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    fetch ('/api/post-user', postUserFetchOptions)
      .then(res => {
        if (res.status == 500) {
          setModalContent(<p className={styles.modalMessage}>
            There was an error somewhere <em>behind the curtain</em>.  Please try again . . .
          </p>)
          setModalOpen(true)
          return
        }
        if (res.status == 200) {
          window.location.href =
            `//${
              window.location.host
            }/event/${
              submitBody.eventId
            }/${
              submitBody.userId
            }?status=${
              isUserNew ? 'user-saved' : 'user-updated'
            }`
          return
        }
      })
  }

  function getDateAnswers(
    responseObject: { [key: string]: boolean },
    clickable: boolean,
    isOrganizer: boolean,
    confirmFinalization: (v: number) => void,
    finalizable: boolean,
    showFinalized: boolean,
    popularList: number[],
  ): JSX.Element[] {
    return eventData.dates.map((date, index) => <DateAnswer
      alternateColor={index % 2 === 0}
      clickable={clickable}
      confirmFinalization={confirmFinalization}
      date={date}
      finalizedDate={finalizedDate}
      finalizable={finalizable}
      hasTime={eventData.hasTime}
      isFinalized={isFinalized}
      isOrganizer={isOrganizer}
      isPopular={popularList.includes(index)}
      key={index}
      response={responseObject[date]}
      setUserResponses={setUserResponses}
      showFinalized={showFinalized}
      userResponses={responseObject}
    />
  )}

  function confirmFinalization(date: number): void {
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
          const updatedEventData: EventShape = {
            ...eventData,
            finalizedDate: date,
          }

          const updateEventFetchOptions: FetchOptions = {
            method: 'POST',
            body: JSON.stringify(updatedEventData),
            headers: {
              'Content-Type': 'application/json'
            }
          }
          fetch('/api/update-event', updateEventFetchOptions)
            .then(res => {
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
              })

          setModalOpen(false)
          event.stopPropagation();
        }}
      />
    </div>)
    setModalOpen(true)
  }
  
  const guestComponents: JSX.Element[] = []
  guestsData.forEach((guest, index) => {
    // check if this is the current user
    const isActiveUser = userData && userData.userId == guest.userId

    // Render components for active user
    if (isActiveUser) {
      if (index > 0) guestComponents.unshift(<hr className={styles.rowSeparator} key={`hr-${index}`} />)
      guestComponents.unshift(
        <ResponseRow
          dateAnswerPairs={getDateAnswers(userResponses, true, isOrganizer, confirmFinalization, true, false, popularList)}
          idString='answers-row'
          key={`user-answers-${index}`}
          rowStyle={styles.userAnswers}
          scrollHandler={handleScrollEvent}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
        />
      )
      guestComponents.unshift(
        <UserControls
          isFinalized={isFinalized}
          key='user-controls'
          newUser={!!!userData}
          setUserNick={setUserNick}
          setUserNickTouched={setUserNickTouched}
          submit={submitUserAnswers}
          userNick={userNick}
          userNickTouched={userNickTouched}
        />
      )
      guestComponents.unshift(<ResponsePrompt isFinalized={isFinalized} key='hint' />)
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
          dateAnswerPairs={getDateAnswers(guest.responses, false, isOrganizer, confirmFinalization, false, false, popularList)}
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
  if (!userData && !isFinalized) {
    guestComponents.unshift(<hr className={styles.rowSeparator} key={`new-user-separator`} />)
    guestComponents.unshift(
      <ResponseRow
        dateAnswerPairs={getDateAnswers(userResponses, true, isOrganizer, confirmFinalization, false, false, popularList)}
        idString='answers-row'
        key={`new-user-answers`}
        rowStyle={styles.userAnswers}
        scrollHandler={handleScrollEvent}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
    )
    guestComponents.unshift(
      <UserControls
        isFinalized={isFinalized}
        key='user-controls'
        newUser={!!!userData}
        setUserNick={setUserNick}
        setUserNickTouched={setUserNickTouched}
        submit={submitUserAnswers}
        userNick={userNick}
        userNickTouched={userNickTouched}
      />
    )
    guestComponents.unshift(<ResponsePrompt isFinalized={isFinalized} key='hint' />)
  }
  // Render finalized row if event is finalized
  if (isFinalized) {
    guestComponents.unshift(<hr className={styles.rowSeparator} key={`finalized-separator`} />)
    guestComponents.unshift(
      <ResponseRow
        dateAnswerPairs={getDateAnswers(userResponses, false, false, confirmFinalization, false, true, popularList)}
        idString='answers-row'
        key={`finalized-answers`}
        rowStyle={styles.userAnswers}
        scrollHandler={handleScrollEvent}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
    )
    guestComponents.unshift(
      <p className={clsx(styles.itsOfficial)} key={`nickname-finalized`}>
        It's official!
      </p>
    )
  }

  return (
    <Layout eventPage showLogo>
      <Head>
        <title>{`${eventData.eventName} - on Skedge`}</title>
        <link rel="icon" href="https://skedge.pro/favicon.ico" />
        <meta name="description" content={eventData.eventDesc} />
        <meta name="author" content="Steven Kitzes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`${eventData.eventName} - on Skedge`} />
        <meta property="og:description" content={eventData.eventDesc} />
        <meta property="og:image" content="https://skedge.pro/images/og-image.png" />
        <meta property="og:url" content={`https://skedge.pro/${eventData.eventId}`} />
        <meta property="og:type" content="website" />
      </Head>
      <div className={styles.layoutContent}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{eventData.eventName}{isFinalized && ` (Date Set)`}</h1>
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
