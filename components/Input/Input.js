import clsx from 'clsx'
import styles from './Input.module.scss'

function Input({ errorMessage, invalid = false, label, multiline = false, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <p className={styles.label}>{label}</p>
      {
        multiline
          ? <textarea
              className={clsx(styles.input, invalid && styles.inputError)}
              onChange={onChange}
            />
          : <input
              className={clsx(styles.input, invalid && styles.inputError)}
              onChange={onChange}
            />
      }
      <p className={clsx(styles.errorMessage, invalid && styles.errorMessageVisible)}>
        {errorMessage}
      </p>
    </div>
  )
}

export default Input
