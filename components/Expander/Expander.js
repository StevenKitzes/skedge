import { useState } from 'react'
import clsx from 'clsx'
import styles from './Expander.module.scss'

function Expander({
  content = 'No content provided',
  title = 'No title provided'
}) {
  const [hidden, setHidden] = useState(true)

  return (
    <div className={styles.expander}>
      <div
        className={styles.expanderTitleBar}
        onClick={() => { setHidden(!hidden) }}
      >
        <div className={styles.titleCopy}>
          {title}
        </div>
        <div className={styles.expanderIcon}>
          <img
            alt='Expand'
            className={styles.expanderIcon}
            src='/images/skedge-expander-icon.svg'
          />
        </div>
      </div>
      <div className={clsx(styles.expanderContent, hidden && styles.expanderContentHidden)}>
        {content}
      </div>
    </div>
  )
}

export default Expander
