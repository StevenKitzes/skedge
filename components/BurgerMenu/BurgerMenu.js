import clsx from 'clsx'
import Button from '../Button'
import styles from './BurgerMenu.module.scss'

function BurgerMenu({ menuActive, setMenuActive }) {
  return (
    <div
      className={clsx(styles.container, menuActive ? styles.containerShow : styles.containerHide)}
      onClick={() => { setMenuActive(false) }}
    >
      <div
        className={clsx(styles.buttons, menuActive ? styles.buttonsShow : styles.buttonsHide)}
      >
        <Button
          classes={styles.spacedButton}
          href='/'
          label='Skedge home'
          variant='outlined'
        />
        <Button
          classes={styles.spacedButton}
          href='/404'
          label='404 error'
          variant='outlined'
        />
        <Button
          classes={styles.spacedButton}
          href='/construction'
          label='Under construction'
          variant='outlined'
        />
      </div>
    </div>
  )
}

export default BurgerMenu
