import styles from './Hero.module.scss'

function Hero ({ title }) {
  return (
    <div>
      <img
        alt='Skedge'
        className={styles.logo}
        src='../images/skedge-logo-outline.svg'
      />
      <h1 className={styles.title}>
        {title}
      </h1>
    </div>
  )
}

export default Hero
