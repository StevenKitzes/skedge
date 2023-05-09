import getConfig from 'next/config'
import Link from 'next/link'

import styles from './Footer.module.scss'

function Footer() {
  const version = getConfig()?.publicRuntimeConfig?.version

  return (
    <div className={styles.footer}>
      <p className={styles.footerCopy}>
        <span className='highlight'>Skedge</span> is brought to you{' '}
        with <img className={styles.heart} alt='Love' src='/images/skedge-heart.svg' /> by{' '}
        <Link
          className='textLink'
          href="https://www.github.com/stevenkitzes"
        >
            Steven Kitzes
        </Link>
        <span> - v{version}</span>
      </p>
    </div>
  )
}

export default Footer
