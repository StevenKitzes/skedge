import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'

function Event () {
  const router = useRouter()
  const {eventId, userId} = router.query

  return (
    <Layout>
      <p>Loading page with eventId {eventId} and userId {userId}</p>
    </Layout>
  )
}

export default Event
