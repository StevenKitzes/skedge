import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import EventLoading from '../../../components/Event/EventLoading'

function Event () {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const {eventId, userId} = router.query

  if (loading) {
    return <EventLoading />
  }
  return (
    <Layout>
      <p>Loading page with eventId {eventId} and userId {userId}</p>
    </Layout>
  )
}

export default Event
