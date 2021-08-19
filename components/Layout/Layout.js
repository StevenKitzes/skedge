import { useState } from 'react'
import clsx from 'clsx'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import Footer from '../Footer'
import Header from '../Header'
import styles from './Layout.module.scss'

function Layout({ children, createButtonOverride, eventPage, showLogo }) {
  const [menuActive, setMenuActive] = useState(false)
  
  return (
    <div className={eventPage ? styles.eventPage : styles.container}>
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
