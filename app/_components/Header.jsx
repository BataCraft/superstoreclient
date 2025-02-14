"use client"
import { useEffect, useState } from 'react'
import HeaderAds from "./_NavComponents/HeaderAds"
import InfoHeader from "./_NavComponents/InfoHeader"
import SearchSection from "./_NavComponents/SearchSection"

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) { // scroll down
        setIsVisible(false)
      } else { // scroll up
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <header className="relative w-full">
      <div className="relative z-10">
        <HeaderAds />
      </div>

      <nav className={`sticky top-0 z-50 w-full transition-transform duration-300 bg-white 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="w-full backdrop-blur-sm bg-white/90">
          <InfoHeader />
          <SearchSection />
        </div>
      </nav>
    </header>
  )
}

export default Header