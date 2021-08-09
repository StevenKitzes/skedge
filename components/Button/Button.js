import clsx from 'clsx'
import Link from 'next/link'
import styles from './Button.module.scss'

function Button({ classes, href = null, label, onClick = null, variant = 'solid' }) {
  const buttonStyle = variant == 'solid'
    ? styles.solid
    : styles.outlined

  if (!!href && !!!onClick) {
    return (
      <Link href={href}>
        <a
          alt={label}
          className={clsx(classes, buttonStyle)}
        >
          {label}
        </a>
      </Link>
    )
  }

  if (!!!href && !!onClick) {
    return (
      <a
        alt={label}
        className={clsx(classes, buttonStyle)}
        onClick={onClick}
      >
        {label}
      </a>
    )
  }

  return null;
}

export default Button
