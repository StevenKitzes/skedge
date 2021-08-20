import clsx from 'clsx'
import styles from './Input.module.scss'

function Input({ classes, containerClasses, errorMessage, id, invalid = false, label, multiline = false, onChange, placeholder, readOnly, value }) {
  return (
    <div className={containerClasses || styles.inputContainer}>
      <p className={styles.label}>{label}</p>
      {
        multiline
          ? <textarea
              className={clsx(styles.input, classes, invalid && styles.inputError)}
              id={id}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
              value={value}
            />
          : <input
              className={clsx(styles.input, classes, invalid && styles.inputError)}
              id={id}
              onChange={onChange}
              placeholder={placeholder}
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
