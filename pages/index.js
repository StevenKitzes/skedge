import Head from 'next/head'
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
        <p className={styles.welcomeTo}>Welcome to</p>
        <img className={styles.skedgeLogo} src='../images/skedge.svg' />
      </div>
      <div className={styles.subtitleContainer}>
        <img className={styles.skedgeIllumination} src='../images/skedge-icon.svg' />
        <span className={styles.scheduling}>cheduling for busy bees!</span>
      </div>
      <p>I'll probably finish this project... eventually!</p>
    </Layout>
  )
}
