import clsx from 'clsx'
import Button from '../../Button'
import DateAnswersHeader from '../../DateAnswers/DateAnswersHeader'
import DateAnswerPair from '../../DateAnswers/DateAnswerPair'
import Input from '../../Input'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLayout.module.scss'

function EventLayout ({ eventData, guestsData, userData }) {
  function handleScroll(event) {
    const header = document.getElementById('date-answers-header-scroll')
    const rows = document.getElementsByClassName('date-answers-row-scroll')
    header.scrollLeft = event.target.scrollLeft
    for(let i = 0; i < rows.length; i++) {
      rows[i].scrollLeft = event.target.scrollLeft
    }
  }

  const guestComponents = []
  guestsData.forEach((guest, index) => {
    // check if this is the current user
    const isActiveUser = userData && userData.userId == guest.userId

    const responses = []
    eventData.dates.forEach((date) => {
      const dateStr = date.toString()
      if (!guest.responses.hasOwnProperty(dateStr)) responses.push(-1)
      else if (guest.responses[date] === 1) responses.push(1)
      else if (guest.responses[date] === 0) responses.push(0)
      else responses.push(-1)
    })

    if (isActiveUser) {
      if (index > 0) guestComponents.unshift(<hr className={styles.rowSeparator} />)
      guestComponents.unshift(
        <div className={clsx(styles.userAnswers, 'date-answers-row-scroll')} onScroll={handleScroll}>
          {responses.map((response, index) => <DateAnswerPair alternateColor={index % 2 === 0} response={response} />)}
        </div>
      )
      guestComponents.unshift(
        <div className={styles.userControlsContainer}>
          <Input classes={styles.userNickInput} containerClasses={styles.userNickInputContainer} id='date-answers-nick' placeholder='Nickname required' value={guest.nickname} />
          <Button
            classes={styles.button}
            label='Update'
            onClick={() => alert(`submit answers not yet implemented`)}
          />
        </div>
      )
    } else {
      if (index > 0) guestComponents.push(<hr className={styles.rowSeparator} />)
      guestComponents.push(
        <p className={styles.nickname}>
          {guest.nickname}
        </p>
      )
      guestComponents.push(
        <div className={clsx(styles.answers, 'date-answers-row-scroll')} onScroll={handleScroll}>
          {responses.map((response, index) => <DateAnswerPair alternateColor={index % 2 === 0} response={response} />)}
        </div>
      )
    }
  })
  guestComponents.unshift(<hr className={styles.rowSeparator} />)

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
