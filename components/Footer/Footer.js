import Link from 'next/link'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.footerCopy}>
        <span className='highlight'>Skedge</span> is brought to you{' '}
        with <img className={styles.heart} alt='Love' src='/images/skedge-heart.svg' /> by{' '}
        <Link href="https://www.github.com/stevenkitzes">
          <a className='textLink'>
            Steven Kitzes
          </a>
        </Link>
      </p>
    </div>
  )
}

export default Footer
