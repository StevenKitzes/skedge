import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './Button.module.scss'

function Button({ alternateLabel = null, classes, href = null, label, onClick = null, variant = 'solid' }) {
  const [copy, setCopy] = useState(label)

  let buttonStyle
  switch (variant) {
    case 'dark':
      buttonStyle = styles.dark
      break
    case 'outlined':
      buttonStyle = styles.outlined
      break
    case 'solid':
    default:
      buttonStyle = styles.solid
      break
  }

  if (!!href && !!!onClick) {
    return (
      <Link href={href}>
        <a
          alt={copy}
          className={clsx(classes, buttonStyle)}
        >
          {copy}
        </a>
      </Link>
    )
  }

  if (!!!href && !!onClick) {
    return (
      <a
        alt={copy}
        className={clsx(classes, copy === label ? buttonStyle : styles.dark)}
        onClick={(event) => {
          if (alternateLabel) {
            setCopy(alternateLabel)
            setTimeout(() => setCopy(label), 750)
          }
          onClick(event)
        }}
      >
        {copy}
      </a>
    )
  }

  return null;
}

export default Button
