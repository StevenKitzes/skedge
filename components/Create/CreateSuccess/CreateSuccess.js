import Lottie from 'react-lottie'
import Hero from '../../Hero'
import Input from '../../Input'
import Layout from '../../Layout'
import styles from './CreateSuccess.module.scss'

import warning from '../../../public/images/skedge-warning'

function CreateSuccess ({ eventHash, organizerHash }) {
  return (
    <Layout>
      <Hero title='Success!' />
      <hr className={styles.separator} />
      <h2 className={styles.successHeader}>Your event was created successfully!</h2>
      <h3 className={styles.linkInfo}>Event page to share!</h3>
      <Input
        readOnly
        value={`https://skedge.org/event/${eventHash}`}
      />
      <hr className={styles.separator} />
      <h3 className={styles.linkInfo}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: warning,
            preserveAspectRatio: 'xMidYMid slice'
          }}
          height={24}
          width={24}
        />
        Event page for your eyes only!!
      </h3>
      <Input
        readOnly
        value={`https://skedge.org/event/${eventHash}/${organizerHash}`}
      />
    </Layout>
  )
}

export default CreateSuccess
