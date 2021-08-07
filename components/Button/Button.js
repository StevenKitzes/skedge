import styles from './Button.module.scss'

function Button({ label, url, variant = 'solid' }) {
  const buttonStyle = variant == 'solid'
    ? styles.solid
    : styles.outlined

  return (
    <a
      className={buttonStyle}
      href={url}
      alt={label}
    >
      {label}
    </a>
  )
}

export default Button
