import Head from 'next/head'

import Button from '../components/Button'
import Layout from '../components/Layout'
import styles from './index.module.scss'

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Skedge - Social Scheduling for Busy Bees</title>
        <link rel="icon" href="https://skedge.pro/favicon.ico" />
        <meta name="description" content="Skedge is a free scheduling tool to help you organize events with busy people.  Simplify event planning without sacrificing your personal information - ever!" />
        <meta name="keywords" content="skedge, skedge.pro, schedule, scheduler, scheduling, schedule tool, scheduler tool, scheduling tool, organize schedule, organize scheduling, social scheduling tool, free scheduler, productivity tool, online scheduler, online scheduling, efficient scheduling" />
        <meta name="author" content="Steven Kitzes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Skedge - Social Scheduling for Busy Bees" />
        <meta property="og:description" content="Skedge is a free scheduling tool to help you organize events with busy people.  Simplify event planning without sacrificing your personal information - ever!" />
        <meta property="og:image" content="https://skedge.pro/images/og-image.png" />
        <meta property="og:url" content="https://skedge.pro" />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.titleContainer} id='title'>
        <h1 className={styles.welcomeTo}>Welcome to</h1>
        <img className={styles.skedgeLogo} />
      </div>
      <div className={styles.subtitleContainer}>
        <h3 className={styles.subtitle}>Scheduling for busy bees!<img className={styles.busyBee} /></h3>
      </div>
      <Button
        classes={styles.buttonBottomMargin}
        href='/create'
        label='Create an event'
        variant='solid'
      />
      <Button
        classes={styles.buttonBottomMargin}
        href='/learn'
        label='Learn more'
        variant='outlined'
      />
      <Button
        classes={styles.kofiParent}
        href='https://ko-fi.com/steverino'
        newTab
        variant='outlined'
      >
        <img
          src="/images/cup-border.webp"
          alt="Ko-fi donations"
          className={styles.kofiImage} />
        Leave a tip!
      </Button>
    </Layout>
  )
}
