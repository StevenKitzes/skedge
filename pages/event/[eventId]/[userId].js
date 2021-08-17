import { useEffect, useState } from 'react'
import EventFail from '../../../components/Event/EventFail'
import EventLoading from '../../../components/Event/EventLoading'
import FourOhFour from '../../../components/FourOhFour'
import Layout from '../../../components/Layout'

function Event () {
  const [loading, setLoading] = useState(true)
  const [fourOhFour, setFourOhFour] = useState(null)
  const [error, setError] = useState(null)
  const [eventData, setEventData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [guestsData, setGuestsData] = useState(null)

  useEffect(() => {
    const path = window.location.toString().split('/')
    const eventId = path[path.length - 2]
    const userId = path[path.length - 1]
    fetch(`/api/${eventId}/${userId}`)
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
        setEventData(json[0])
        setUserData(json[1])
        setGuestsData(json[2])
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

export default Event
