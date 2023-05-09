import { useEffect, useState } from 'react'
import EventFail from '../EventFail'
import EventLayout from '../EventLayout'
import EventLoading from '../EventLoading'
import FourOhFour from '../../FourOhFour'
import { EventShape, UserShape } from '../../../helpers/db'

type EventMainProps = {
  hasUser?: boolean,
}

function EventMain ({ hasUser }: EventMainProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [fourOhFour, setFourOhFour] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [eventData, setEventData] = useState<EventShape | null>(null)
  const [guestsData, setGuestsData] = useState<UserShape[] | null>(null)
  const [userData, setUserData] = useState<UserShape | null>(null)

  function getEventId(pathParts: string[]): string {
    return pathParts[pathParts.length - (hasUser ? 2 : 1)]
  }
  function getUserId(pathParts: string[]): string | undefined {
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
