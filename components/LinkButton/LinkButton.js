import clsx from 'clsx'
import Link from 'next/link'
import styles from '../Button/Button.module.scss'

function LinkButton({ classes, href, label, variant = 'solid' }) {
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

export default LinkButton
