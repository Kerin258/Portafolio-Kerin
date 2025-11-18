import './App.css'
import './portfolio.css'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Intro from './components/Intro'
import { useEffect } from 'react'

function Header(){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <nav className="nav">
          <a href="#top">Inicio</a>
          <a href="#projects-track">Proyectos</a>
          <a href="#about">Sobre mí</a>
          <a href="#contact">Contacto</a>
        </nav>
        <div className="header-name">
          <span>Kerin Gonzalez</span>
        </div>
      </div>
    </header>
  )
}

function App() {
  // Handle header transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.site-header')
      if (!header) return
      
      if (window.scrollY > 50) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-root" id="top">
      <>
        <Intro />
        <Header />
        <Hero />
        <main>
          <Projects />
          <About />
          <Contact />
        </main>
        <footer className="site-footer">© {new Date().getFullYear()} KERIN GONZALEZ — Portafolio</footer>
      </>
    </div>
  )
}

export default App
