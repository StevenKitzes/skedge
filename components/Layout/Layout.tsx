import { PropsWithChildren, useState } from 'react'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import Footer from '../Footer'
import Header from '../Header'
import styles from './Layout.module.scss'

type LayoutProps = {
  eventPage?: boolean,
  showLogo?: boolean,
}

function Layout({ children, eventPage, showLogo }: PropsWithChildren<LayoutProps>) {
  const [menuActive, setMenuActive] = useState(false)
  
  return (
    <div className={eventPage ? styles.eventPage : styles.container}>
      <BurgerMenu
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
