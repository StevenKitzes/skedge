import Head from 'next/head'
import Button from '../components/Button'
import Layout from '../components/Layout'
import styles from './index.module.scss'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Skedge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.titleContainer}>
        <h1 className={styles.welcomeTo}>Welcome to</h1>
        <img className={styles.skedgeLogo} src='../images/skedge-logo-outline.svg' />
      </div>
      <div className={styles.subtitleContainer}>
        <h3>Scheduling for busy bees!</h3>
      </div>
      <Button
        label='Create an event'
        url='http://stevenkitz.es'
        variant='outlined'
      />
    </Layout>
  )
}
