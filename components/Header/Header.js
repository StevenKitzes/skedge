import Link from 'next/link'
import styles from './Header.module.scss'

function Header() {
  return (
    <div className={styles.header}>
      <Link href='/'>
        <a className={styles.iconAnchor} alt='Skedge Home'>
          <img className={styles.icon} src='../images/skedge-icon.svg' alt='Skedge Logo' />
        </a>
      </Link>
      <img className={styles.hamburger} src='../images/skedge-hamburger.svg' alt='Skedge Menu' />
    </div>
  )
}

export default Header
