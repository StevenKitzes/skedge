import Link from 'next/link'
import styles from './Header.module.scss'

function Header({ menuActive, setMenuActive, showLogo }) {
  return (
    <div className={styles.header}>
      <Link
        alt='Skedge Home'
        className={styles.iconAnchor}
        href='/'
      >
        <img
          className={styles.icon}
          src={showLogo ? '/images/skedge-logo.svg' : '/images/skedge-icon.svg'}
          alt='Skedge Logo'
        />
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
