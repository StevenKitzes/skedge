import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import styles from './Button.module.scss'

type ButtonProps = {
  alternateLabel?: string | null,
  classes?: any,
  href?: string | null,
  label: string,
  onClick?: ((event: React.MouseEvent) => void) | null,
  variant?: string,
}

function Button({ alternateLabel = null, classes, href = null, label, onClick = null, variant = 'solid' }: ButtonProps): JSX.Element | null {
  const [copy, setCopy] = useState<string>(label)

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
      <Link
        className={clsx(classes, buttonStyle)}
        href={href}
      >
          {copy}
      </Link>
    )
  }

  if (!!!href && !!onClick) {
    return (
      <a
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
