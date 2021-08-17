import { useState } from 'react'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import Footer from '../Footer'
import Header from '../Header'
import styles from './Layout.module.scss'

function Layout({ children, createButtonOverride, showLogo }) {
  const [menuActive, setMenuActive] = useState(false)
  
  return (
    <div className={styles.container}>
      <BurgerMenu
        createButtonOverride={createButtonOverride}
        menuActive={menuActive}
        setMenuActive={setMenuActive}
      />
      <Header
        menuActive={menuActive}
        setMenuActive={setMenuActive}
        showLogo={showLogo}
      />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
