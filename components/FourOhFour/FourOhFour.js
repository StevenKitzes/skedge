import Button from '../Button'
import Hero from '../Hero'
import Layout from '../Layout'
import Oof from '../Oof'
import Separator from '../Separator'

function FourOhFour({ message }) {
  return (
    <Layout>
      <Hero title='Page Not Found' />
      <Separator />
      <Oof
        copyTop={message}
        copyBottom='Did you try to schedule something on another timeline?'
      />
      <Button
        href='/'
        label='Back to Skedge'
      />
    </Layout>
  )
}

export default FourOhFour
