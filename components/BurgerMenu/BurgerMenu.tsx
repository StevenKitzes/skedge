import clsx from 'clsx'
import Button from '../Button'
import styles from './BurgerMenu.module.scss'

type BurgerMenuProps = {
  menuActive: boolean,
  setMenuActive: (v: boolean) => void,
}

function BurgerMenu({ menuActive, setMenuActive }: BurgerMenuProps): JSX.Element {
  return (
    <div
      className={clsx(styles.container, menuActive ? styles.containerShow : styles.containerHide)}
      onClick={() => { setMenuActive(false) }}
    >
      <div
        className={clsx(styles.buttons, menuActive ? styles.buttonsShow : styles.buttonsHide)}
      >
        <img alt='Menu' className={styles.hamburger} src='/images/skedge-hamburger.svg' />
        <Button
          classes={styles.spacedButton}
          href='/'
          label='Skedge home'
          variant='outlined'
        />
        <Button
          classes={styles.spacedButton}
          href={'/create'}
          label='Create an event'
          variant='outlined'
        />
        <Button
          classes={styles.spacedButton}
          href='/learn'
          label='Learn more'
          variant='outlined'
        />
        <Button
          classes={clsx(styles.kofiParent, styles.spacedButton)}
          href='https://ko-fi.com/steverino'
          newTab
          variant='outlined'
        >
          <img
            src="../public/images/cup-border.webp"
            alt="Ko-fi donations"
            className={styles.kofiImage} />
          Leave a tip!
        </Button>
      </div>
    </div>
  )
}

export default BurgerMenu
