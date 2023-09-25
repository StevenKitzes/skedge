import Head from 'next/head'

import Button from '../Button'
import Hero from '../Hero'
import Layout from '../Layout'
import Oof from '../Oof'
import Separator from '../Separator'
import styles from './FourOhFour.module.scss'

type FourOhFourProps = {
  message?: string,
}

function FourOhFour({ message }: FourOhFourProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Skedge Event - 404 Error</title>
        <link rel="icon" href="https://skedge.pro/favicon.ico" />
        <meta name="description" content="Skedge is a mighty tool, but only when you get a valid link!  You have got your hands on a bad link." />
        <meta name="author" content="Steven Kitzes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Skedge Event - 404 Error" />
        <meta property="og:description" content="Skedge is a mighty tool, but only when you get a valid link!  You have got your hands on a bad link." />
        <meta property="og:image" content="https://skedge.pro/images/og-image.png" />
        <meta property="og:url" content="https://skedge.pro/404.html" />
        <meta property="og:type" content="website" />
      </Head>
      <Hero title='Page Not Found' />
      <Separator />
      <Oof
        copyTop={message}
        copyBottom='Did you try to schedule something on another timeline?'
      />
      <Button
        classes={styles.button}
        href='/'
        label='Back to Skedge'
      />
    </Layout>
  )
}

export default FourOhFour
