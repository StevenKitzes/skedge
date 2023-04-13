import clsx from 'clsx'
import styles from './Input.module.scss'

function Input({ classes, containerClasses, errorMessage, id, invalid = false, label, multiline = false, onChange, placeholder, readOnly, value }) {
  // helps with local dev/testing
  const _value = window?.location.host.includes('localhost') ?
    value.replace('https://skedge.pro', 'localhost:3000') :
    value

  return (
    <div className={containerClasses || styles.inputContainer}>
      <p className={styles.label}>{label}</p>
      {
        multiline
          ? <textarea
              className={clsx(styles.input, classes, invalid && styles.inputError)}
              id={id}
              onChange={onChange}
              onClick={(event) => event.stopPropagation()}
              placeholder={placeholder}
              readOnly={readOnly}
              value={_value}
            />
          : <input
              className={clsx(styles.input, classes, invalid && styles.inputError)}
              id={id}
              onChange={onChange}
              onClick={(event) => event.stopPropagation()}
              placeholder={placeholder}
              readOnly={readOnly}
              value={_value}
            />
      }
      <p className={clsx(styles.errorMessage, invalid && styles.errorMessageVisible)}>
        {errorMessage}
      </p>
    </div>
  )
}

export default Input
