import { useEffect, useState } from 'react'
import EventFail from '../../../components/Event/EventFail'
import EventLoading from '../../../components/Event/EventLoading'
import FourOhFour from '../../../components/FourOhFour'
import Layout from '../../../components/Layout'

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
          setLoading(false)
          setFourOhFour(true)
        } else if (res.status == 500) {
          setLoading(false)
          setError('Something went wrong trying to retrieve this event.')
        } else {
          return res.json()
        }
      })
      .then((json) => {
        if (!json) return
        setLoading(false)
        // These indices determined by Promise.all ordering in pages/api/[...slug].js
        setEventData(json[0])
        setGuestsData(json[1])
        if (hasUser) setUserData(json[2])
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
    <Layout>
      <p>Event data: {JSON.stringify(eventData, null, 2)}</p>
      <p>User data: {JSON.stringify(userData, null, 2)}</p>
      <p>Guests data: {JSON.stringify(guestsData, null, 2)}</p>
    </Layout>
  )
}

export default EventMain
