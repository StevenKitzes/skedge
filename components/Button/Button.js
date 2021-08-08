import clsx from 'clsx'
import styles from './Button.module.scss'

function Button({ classes, label, href, variant = 'solid' }) {
  const buttonStyle = variant == 'solid'
    ? styles.solid
    : styles.outlined

  return (
    <a
      className={clsx(buttonStyle, classes)}
      href={href}
      alt={label}
    >
      {label}
    </a>
  )
}

export default Button
