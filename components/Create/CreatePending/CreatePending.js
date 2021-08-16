import Hero from '../../Hero'
import Layout from '../../Layout'
import styles from './CreatePending.module.scss'

function CreatePending () {
  return (
    <Layout>
      <Hero title='Creating Event...' />
      <hr className={styles.separator} />
      <img
        alt='Beating hearts means the site is loading!'
        src='/images/skedge-hearts.gif'
      />
    </Layout>
  )
}

export default CreatePending
