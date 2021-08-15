import Lottie from 'react-lottie'
import Button from '../../Button'
import Hero from '../../Hero'
import Layout from '../../Layout'

import oops from '../../../public/images/skedge-oops'

function CreateFail ({ setResStatus }) {
  return (
    <Layout>
      <Hero title='Whoops!' />
      <hr className={styles.separator} />
      <div className={styles.oopsAnimContainer}>
        <div className={styles.oopsLottie}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: oops,
              preserveAspectRatio: 'xMidYMid slice'
            }}
            height={250}
            width={250}
          />
        </div>
        <p className={styles.oopsCopy}>
          Servers borkt!  Please try again...
        </p>
      </div>
      <Button
        label='Try again...?'
        onClick={() => setResStatus(null)}
      />
    </Layout>
  )
}

export default CreateFail