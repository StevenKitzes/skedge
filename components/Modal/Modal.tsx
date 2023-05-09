import { PropsWithChildren } from 'react'

import clsx from 'clsx'

import styles from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean,
  setIsOpen: (b: boolean) => void,
}

function Modal({ children, isOpen, setIsOpen }: PropsWithChildren<ModalProps>): JSX.Element {
  return (
    <div
      className={clsx(styles.modal, isOpen ? styles.modalShow : styles.modalHide)}
      onClick={() => { setIsOpen(false) }}
    >
      <div className={clsx(styles.modalCard, isOpen ? styles.cardShow : styles.cardHide )}>
        <img alt='Close modal' className={styles.modalClose} src='/images/skedge-delete.svg' />
        {children}
      </div>
    </div>
  )
}

export default Modal
