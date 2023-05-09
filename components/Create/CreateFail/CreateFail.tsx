import Button from '../../Button'
import Hero from '../../Hero'
import Layout from '../../Layout'
import Oof from '../../Oof'
import Separator from '../../Separator'
import styles from './CreateFail.module.scss'

type CreateFailProps = {
  setResStatus: (v: string | null) => void,
}

function CreateFail ({ setResStatus }: CreateFailProps) {
  return (
    <Layout>
      <Hero title='Whoops!' />
      <Separator />
      <Oof
        copyTop='The servers are feeling a little under the weather...'
        copyBottom="We're having trouble creating your event right now."
      />
      <Button
        classes={styles.button}
        label='Try again'
        onClick={() => setResStatus(null)}
      />
    </Layout>
  )
}

export default CreateFail