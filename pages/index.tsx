import Head from 'next/head'

import Button from '../components/Button'
import Layout from '../components/Layout'
import styles from './index.module.scss'

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Skedge</title>
        <link rel="icon" href="https://skedge.pro/favicon.ico" />
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
