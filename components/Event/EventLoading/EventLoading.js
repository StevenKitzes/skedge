import Hero from '../../Hero'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLoading.module.scss'

function EventLoading () {
  return (
    <Layout>
      <Hero title='Loading...' />
      <Separator />
    </Layout>
  )
}

export default EventLoading
