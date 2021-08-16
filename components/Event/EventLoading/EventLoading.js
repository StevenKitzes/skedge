import Lottie from 'react-lottie'
import Hero from '../../Hero'
import Layout from '../../Layout'
import Separator from '../../Separator'
import styles from './EventLoading.module.scss'

import loading from '../../../public/images/skedge-loading'

function EventLoading () {
  return (
    <Layout>
      <Hero title='Loading...' />
      <Separator />
      <div className={styles.animationContainer}>
        <Lottie
          options={{
            loop: true,
            animationData: loading,
            preserveAspectRatio: 'xMidYMid slice'
          }}
          height={250}
          width={250}
        />
      </div>
    </Layout>
  )
}

export default EventLoading
