import Button from '../../Button'
import Hero from '../../Hero'
import Layout from '../../Layout'
import Oof from '../../Oof'
import Separator from '../../Separator'

function CreateFail ({ setResStatus }) {
  return (
    <Layout>
      <Hero title='Whoops!' />
      <Separator />
      <Oof copy='The servers are feeling a little under the weather...' />
      <Button
        label='Try again...?'
        onClick={() => setResStatus(null)}
      />
    </Layout>
  )
}

export default CreateFail