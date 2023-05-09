import Button from '../../Button'
import Hero from '../../Hero'
import Layout from '../../Layout'
import Oof from '../../Oof'
import Separator from '../../Separator'
import styles from './EventFail.module.scss'

type EventFailProps = {
  errorMessage?: string,
}

function EventFail ({ errorMessage }: EventFailProps): JSX.Element {
  return (
    <Layout>
      <Hero title='Whoops!' />
      <Separator />
      <Oof
        copyTop='The servers are feeling a little under the weather . . .'
        copyBottom={errorMessage || '. . . the reasons are lost in the fog.'}
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