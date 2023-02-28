import Lottie from 'lottie-react'
import styles from './Oof.module.scss'

import raincloud from '../../public/images/skedge-raincloud'
import zap from '../../public/images/skedge-zap'

function Oof ({ copyTop, copyBottom }) {
  return (
    <div>
      <div className={styles.oofContainer}>
        <div className={styles.raincloudLottie}>
          <Lottie
            loop={true}
            autoplay={true}
            animationData={raincloud}
            preserveAspectRatio={'xMidYMid slice'}
            height={150}
            width={150}
          />
        </div>
        <div className={styles.zapLottie}>
          <Lottie
            loop={true}
            autoplay={true}
            animationData={zap}
            preserveAspectRatio={'xMidYMid slice'}
            height={150}
            width={150}
          />
        </div>
      </div>
      {copyTop &&
        <p className={styles.oofCopy}>
          {copyTop}
        </p>
      }
      {copyBottom &&
        <p className={styles.oofCopy}>
          {copyBottom}
        </p>
      }
    </div>
  )
}

export default Oof
