import clsx from 'clsx'
import styles from './Input.module.scss'

function Input({ invalid = false, label, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <p className={styles.label}>{label}</p>
      <input
        className={clsx(styles.input, invalid && styles.inputError)}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
