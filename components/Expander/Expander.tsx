import { PropsWithChildren, useState } from 'react'
import clsx from 'clsx'
import styles from './Expander.module.scss'
import smallStyles from './ExpanderSmall.module.scss'

type ExpanderProps = {
  content?: string,
  small?: boolean,
  title: string,
}

function Expander({
  children,
  content,
  small,
  title = 'Click to expand . . .',
}: PropsWithChildren<ExpanderProps>) {
  const [hidden, setHidden] = useState(true)
  const sizedStyles = small ? smallStyles : styles

  return (
    <div className={sizedStyles.expander}>
      <div
        className={sizedStyles.expanderTitleBar}
        onClick={() => { setHidden(!hidden) }}
      >
        <div className={sizedStyles.titleCopy}>
          {title}
        </div>
        <div className={sizedStyles.expanderIcon}>
          <img
            alt='Expand'
            className={sizedStyles.expanderIcon}
            src='/images/skedge-expander-icon.svg'
          />
        </div>
      </div>
      <div className={clsx(
        sizedStyles.expanderContent,
        hidden && sizedStyles.expanderContentHidden
      )}>
        {content}
        {!hidden && children}
      </div>
    </div>
  )
}

export default Expander
