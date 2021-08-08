import Header from '../Header'
import styles from './Layout.module.scss'

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  )
}

export default Layout
