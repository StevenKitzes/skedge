import Lottie from 'lottie-react'

import Hero from '../../Hero'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLoading.module.scss'

import loading from '../../../public/images/skedge-loading.json'

function EventLoading (): JSX.Element {
  return (
    <Layout>
      <Hero title='Loading...' />
      <Separator />
      <div className={styles.animationContainer}>
        <Lottie
          loop={true}
          animationData={loading}
          height={250}
          width={250}
        />
      </div>
    </Layout>
  )
}

export default EventLoading