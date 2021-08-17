import { useEffect, useState } from 'react'
import EventFail from '../../../components/Event/EventFail'
import EventLayout from '../../../components/Event/EventLayout'
import EventLoading from '../../../components/Event/EventLoading'
import FourOhFour from '../../../components/FourOhFour'

function EventMain ({ hasUser }) {
  const [loading, setLoading] = useState(true)
  const [fourOhFour, setFourOhFour] = useState(null)
  const [error, setError] = useState(null)
  const [eventData, setEventData] = useState(null)
  const [guestsData, setGuestsData] = useState(null)
  const [userData, setUserData] = useState(null)

  function getEventId(pathParts) {
    return pathParts[pathParts.length - (hasUser ? 2 : 1)]
  }
  function getUserId(pathParts) {
    return hasUser ? pathParts[pathParts.length - 1] : undefined
  }

  useEffect(() => {
    const pathParts = window.location.toString().split('/')
    const eventId = getEventId(pathParts)
    const userId = getUserId(pathParts)
    let url = `/api/${eventId}`
    if (userId) url += `/${userId}`
    fetch(url)
      .then((res) => {
        if (res.status == 404) {
          setFourOhFour(true)
          setLoading(false)
        } else if (res.status == 500) {
          setError('Something went wrong trying to retrieve this event.')
          setLoading(false)
        } else {
          return res.json()
        }
      })
      .then((json) => {
        if (!json) return
        // These indices determined by Promise.all ordering in pages/api/[...slug].js
        setEventData(json[0])
        setGuestsData(json[1])
        if (hasUser) setUserData(json[2])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <EventLoading />
  }
  if (fourOhFour) {
    return <FourOhFour message='The event or user you seek was not found.' />
  }
  if (error) {
    return <EventFail errorMessage={error} />
  }
  return (
    <EventLayout
      eventData={eventData}
      guestsData={guestsData}
      userData={userData}
    />
  )
}

export default EventMain
