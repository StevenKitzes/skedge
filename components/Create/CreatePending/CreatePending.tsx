import Hero from '../../Hero'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './CreatePending.module.scss'

function CreatePending (): JSX.Element {
  return (
    <Layout>
      <Hero title='Creating Event...' />
      <Separator />
      <img
        alt='Beating hearts means the site is loading!'
        className={styles.skedgeHearts}
      />
    </Layout>
  )
}

export default CreatePending
