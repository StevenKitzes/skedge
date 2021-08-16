import Button from '../components/Button'
import Layout from '../components/Layout'
import Separator from '../components/Separator'
import styles from './404.module.scss'

function FourOhFour() {
  return (
    <Layout>
      <h1 className={styles.title}>404</h1>
      <h2>No such page!</h2>
      <Separator />
      <p className={styles.question}>Did you try to schedule something on another timeline?</p>
      <Button
        classes={styles.button}
        href='/'
        label='Back to Skedge'
      />
    </Layout>
  )
}

export default FourOhFour
