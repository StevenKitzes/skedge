import Button from '../Button'
import Hero from '../Hero'
import Layout from '../Layout'
import Oof from '../Oof'
import Separator from '../Separator'
import styles from './FourOhFour.module.scss'

type FourOhFourProps = {
  message?: string,
}

function FourOhFour({ message }: FourOhFourProps) {
  return (
    <Layout>
      <Hero title='Page Not Found' />
      <Separator />
      <Oof
        copyTop={message}
        copyBottom='Did you try to schedule something on another timeline?'
      />
      <Button
        classes={styles.button}
        href='/'
        label='Back to Skedge'
      />
    </Layout>
  )
}

export default FourOhFour
