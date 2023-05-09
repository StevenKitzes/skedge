import Link from 'next/link'
import styles from './Header.module.scss'

type HeaderProps = {
  menuActive: boolean,
  setMenuActive: (v: boolean) => void,
  showLogo?: boolean,
}

function Header({ menuActive, setMenuActive, showLogo }: HeaderProps): JSX.Element {
  return (
    <div className={styles.header}>
      <Link
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
