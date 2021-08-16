import Button from '../../Button'
import Hero from '../../Hero'
import Layout from '../../Layout'
import Oof from '../../Oof'
import Separator from '../../Separator'

function EventFail ({ errorMessage }) {
  return (
    <Layout>
      <Hero title='Whoops!' />
      <Separator />
      <Oof
        copy='The servers are feeling a little under the weather...'
        errorMessage={errorMessage}
      />
      <Button
        label='Skedge home'
        href='/'
      />
    </Layout>
  )
}

export default EventFail