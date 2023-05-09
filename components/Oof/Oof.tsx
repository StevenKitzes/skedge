import Lottie from 'lottie-react'
import styles from './Oof.module.scss'

import raincloud from '../../public/images/skedge-raincloud.json'
import zap from '../../public/images/skedge-zap.json'

type OofProps = {
  copyTop?: string,
  copyBottom?: string,
}

function Oof ({ copyTop, copyBottom }: OofProps): JSX.Element {
  return (
    <div>
      <div className={styles.oofContainer}>
        <div className={styles.raincloudLottie}>
          <Lottie
            loop={true}
            autoplay={true}
            animationData={raincloud}
            height={150}
            width={150}
          />
        </div>
        <div className={styles.zapLottie}>
          <Lottie
            loop={true}
            autoplay={true}
            animationData={zap}
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
