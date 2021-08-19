import { useState } from 'react'
import clsx from 'clsx'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import Footer from '../Footer'
import Header from '../Header'
import styles from './Layout.module.scss'

function Layout({ children, createButtonOverride, noMargin, showLogo }) {
  const [menuActive, setMenuActive] = useState(false)
  
  return (
    <div className={clsx(styles.container, noMargin ? styles.noMargin : null)}>
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
