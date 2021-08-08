import Button from '../components/Button'
import Layout from '../components/Layout'
import styles from './construction.module.scss'

function Construction() {
  return (
    <Layout>
      <h1 className={styles.title}>This page under construction.</h1>
      <Button
        href='/'
        label='Back to Skedge'
      />
    </Layout>
  )
}

export default Construction
