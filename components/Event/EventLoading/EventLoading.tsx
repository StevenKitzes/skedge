import Head from 'next/head'
import Lottie from 'lottie-react'

import Hero from '../../Hero'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLoading.module.scss'

import loading from '../../../public/images/skedge-loading.json'

type EventLoadingProps = {
  eventId: string | null;
  userId: string | null;
}

function EventLoading ({ eventId, userId }: EventLoadingProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Skedge Event - Loading</title>
        <link rel="icon" href="https://skedge.pro/favicon.ico" />
        <meta name="description" content="Your Skedge event is loading . . ." />
        <meta name="author" content="Steven Kitzes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Skedge Event - Loading" />
        <meta property="og:description" content="Your Skedge event is loading . . ." />
        <meta property="og:image" content="https://skedge.pro/images/og-image.png" />
        <meta property="og:url" content={`https://skedge.pro${eventId ? `/${eventId}` : ""}${userId ? `/${userId}` : ""}`} />
        <meta property="og:type" content="website" />
      </Head>
      <Hero title='Loading...' />
      <Separator />
      <div className={styles.animationContainer}>
        <Lottie
          loop={true}
          animationData={loading}
          height={250}
          width={250}
        />
      </div>
    </Layout>
  )
}

export default EventLoading
