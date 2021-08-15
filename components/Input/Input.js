import clsx from 'clsx'
import styles from './Input.module.scss'

function Input({ errorMessage, id, invalid = false, label, multiline = false, onChange, readOnly, value }) {
  return (
    <div className={styles.inputContainer}>
      <p className={styles.label}>{label}</p>
      {
        multiline
          ? <textarea
              className={clsx(styles.input, invalid && styles.inputError)}
              id={id}
              onChange={onChange}
              readOnly={readOnly}
              value={value}
            />
          : <input
              className={clsx(styles.input, invalid && styles.inputError)}
              id={id}
              onChange={onChange}
              readOnly={readOnly}
              value={value}
            />
      }
      <p className={clsx(styles.errorMessage, invalid && styles.errorMessageVisible)}>
        {errorMessage}
      </p>
    </div>
  )
}

export default Input
