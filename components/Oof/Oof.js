import Lottie from 'react-lottie'
import styles from './Oof.module.scss'

import raincloud from '../../public/images/skedge-raincloud'
import zap from '../../public/images/skedge-zap'

function Oof ({ copy }) {
  return (
    <div>
      <div className={styles.oofContainer}>
        <div className={styles.raincloudLottie}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: raincloud,
              preserveAspectRatio: 'xMidYMid slice'
            }}
            height={150}
            width={150}
          />
        </div>
        <div className={styles.zapLottie}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: zap,
              preserveAspectRatio: 'xMidYMid slice'
            }}
            height={150}
            width={150}
          />
        </div>
      </div>
      {copy &&
        <p className={styles.oofCopy}>
          {copy}
        </p>
      }
    </div>
  )
}

export default Oof
