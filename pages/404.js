import Button from '../components/Button'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Oof from '../components/Oof'
import Separator from '../components/Separator'

function FourOhFour() {
  return (
    <Layout>
      <Hero title='Page Not Found' />
      <Separator />
      <Oof copy='Did you try to schedule something on another timeline?' />
      <Button
        href='/'
        label='Back to Skedge'
      />
    </Layout>
  )
}

export default FourOhFour
