import Head from 'next/head'
import Button from '../components/Button'
import Layout from '../components/Layout'
import styles from './index.module.scss'

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Skedge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.titleContainer} id='title'>
        <h1 className={styles.welcomeTo}>Welcome to</h1>
        <img className={styles.skedgeLogo} src='/images/skedge-logo-outline.svg' />
      </div>
      <div className={styles.subtitleContainer}>
        <h3 className={styles.subtitle}>Scheduling for busy bees!</h3>
      </div>
      <Button
        classes={styles.createButton}
        href='/create'
        label='Create an event'
        variant='solid'
      />
      <Button
        href='/learn'
        label='Learn more'
        variant='outlined'
      />
    </Layout>
  )
}
