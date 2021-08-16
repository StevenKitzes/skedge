import Link from 'next/link'
import styles from './Header.module.scss'

function Header({ menuActive, setMenuActive }) {
  return (
    <div className={styles.header}>
      <Link href='/'>
        <a className={styles.iconAnchor} alt='Skedge Home'>
          <img className={styles.icon} src='/images/skedge-icon.svg' alt='Skedge Logo' />
        </a>
      </Link>
      <img
        alt='Skedge Menu'
        className={styles.hamburger}
        onClick={() => { setMenuActive(!menuActive) }}
        src='/images/skedge-hamburger.svg'
      />
    </div>
  )
}

export default Header
