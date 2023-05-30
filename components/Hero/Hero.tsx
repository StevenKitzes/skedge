import styles from './Hero.module.scss'

type HeroProps = {
  title: string,
}

function Hero ({ title }: HeroProps): JSX.Element {
  return (
    <div>
      <img
        alt='Skedge'
        className={styles.logo}
      />
      <h1 className={styles.title}>
        {title}
      </h1>
    </div>
  )
}

export default Hero
