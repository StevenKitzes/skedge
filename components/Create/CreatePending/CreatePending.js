import Hero from '../../Hero'
import Layout from '../../Layout'
import Separator from '../../Separator'

function CreatePending () {
  return (
    <Layout>
      <Hero title='Creating Event...' />
      <Separator />
      <img
        alt='Beating hearts means the site is loading!'
        src='/images/skedge-hearts.gif'
      />
    </Layout>
  )
}

export default CreatePending
