import clsx from 'clsx'
import Link from 'next/link'
import styles from './Button.module.scss'

function Button({ classes, href, label, variant = 'solid' }) {
  const buttonStyle = variant == 'solid'
    ? styles.solid
    : styles.outlined

  return (
    <Link href={href}>
      <a
        className={clsx(buttonStyle, classes)}
        alt={label}
      >
        {label}
      </a>
    </Link>
  )
}

export default Button
