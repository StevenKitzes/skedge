import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
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
        <h3 className={styles.subtitle}>Scheduling for busy bees!</h3>
      </div>
      <Button
        classes={styles.createButton}
        href='https://stevenkitz.es'
        label='Create event'
        variant='solid'
      />
      <LinkButton
        href='https://stevenkitz.es'
        label='Learn more'
        variant='outlined'
      />
    </Layout>
  )
}
