import Button from '../../Button'
import Hero from '../../Hero'
import Layout from '../../Layout'
import Oof from '../../Oof'
import Separator from '../../Separator'
import styles from './EventFail.module.scss'

function EventFail ({ errorMessage }) {
  return (
    <Layout>
      <Hero title='Whoops!' />
      <Separator />
      <Oof
        copyTop='The servers are feeling a little under the weather...'
        copyBottom={errorMessage}
      />
      <Button
        classes={styles.button}
        label='Skedge home'
        href='/'
      />
    </Layout>
  )
}

export default EventFail