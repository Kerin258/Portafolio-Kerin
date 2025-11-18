import React, { useRef, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import demoImage from '../assets/yo.png'
import imgRedSocial from '../assets/red-social.png'
import imgGlosario from '../assets/glosario.png'
import imgEscapa from '../assets/escapa-trump.png'
import imgTicTacToe from '../assets/tic-tac-toe.png'
import imgECommers from '../assets/E-Commers.png'
import imgCRUD from '../assets/crud.png'

const projects = [
  {
    id: 1,
    title: 'Proyecto 1 - E-Commers',
    description: 'Tienda en línea con catálogo de productos, carrito de compras y gestión de inventario.',
    details: 'Incluye filtrado de productos y proceso de compra completo.',
    link: 'https://kerin258.github.io/E-Commers/productos.html',
    repo: 'https://github.com/Kerin258/E-Commers.git',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: imgECommers
  },
  {
    id: 2,
    title: 'Proyecto 2 - Mi Red Social',
    description: 'Mockup responsivo de una red social con feed y perfiles. (Sin frameworks CSS).',
    details: 'Diseño completamente responsivo sin usar frameworks CSS.',
    link: 'https://kerin258.github.io/Conecta2/',
    repo: 'https://github.com/Kerin258/Conecta2?authuser=0',
    tags: ['HTML', 'CSS'],
    image: imgRedSocial
  },
  {
    id: 3,
    title: 'Proyecto 3 - Cheat Sheet',
    description: 'Acordeón con las principales etiquetas HTML y ejemplos. Entregado vía GitHub Pages.',
    details: 'Referencia interactiva de etiquetas HTML con ejemplos prácticos.',
    link: 'https://kerin258.github.io/Cheat-sheet/',
    repo: 'https://kerin258.github.io/Cheat-sheet/',
    tags: ['HTML', 'CSS'],
    image: imgGlosario
  },
  {
    id: 4,
    title: 'Proyecto 4 - Escapa de Trump',
    description: 'Juego de navegador con panel de configuración para ajustar velocidad y fondos.',
    details: 'Juego dinámico con opciones de personalización.',
    link: 'https://kerin258.github.io/Escapa-De-Trump/',
    repo: 'https://github.com/Kerin258/Escapa-De-Trump',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: imgEscapa
  },
  {
    id: 5,
    title: 'Proyecto 5 - CRUD',
    description: 'Sistema CRUD completo con validación, diálogos modales, confirmación de borrado y AJAX.',
    details: 'Operaciones de base de datos sin recargar la página.',
    link: 'https://kerin258.github.io/CRUD-Kerin/',
    repo: 'https://github.com/Kerin258/CRUD-Kerin.git',
    tags: ['HTML', 'CSS', 'JavaScript', 'AJAX'],
    image: imgCRUD
  },
  {
    id: 6,
    title: 'Proyecto 6 - Tic-Tac-Toe',
    description: 'Juego en React basado en el tutorial, con configuraciones y easter egg.',
    details: 'Juego clásico con funcionalidades adicionales en React.',
    link: 'https://kerin258.github.io/TicTacToe-Kerin-Del-Jesus/',
    repo: 'https://github.com/Kerin258/TicTacToe-Kerin-Del-Jesus',
    tags: ['HTML', 'React', 'CSS', 'JavaScript', 'Vite'],
    image: imgTicTacToe
  }
]

export default function Projects(){
  const ref = useRef(null)
  const trackRef = useRef(null)
  const [activeId, setActiveId] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      })
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function scrollToProject(projectId) {
    const track = trackRef.current
    if (!track) return
    
    const index = projects.findIndex(p => p.id === projectId)
    if (index === -1) return
    
    const item = track.children[index]
    if (!item) return
    
    
    const itemLeft = item.offsetLeft
    const itemWidth = item.offsetWidth
    const trackWidth = track.clientWidth
    const targetScroll = itemLeft + itemWidth / 2 - trackWidth / 2
    
    
    track.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    })
    
    setActiveId(projectId)
  }

  function handleNext() {
    const currentIndex = projects.findIndex(p => p.id === activeId)
    if (currentIndex < projects.length - 1) {
      scrollToProject(projects[currentIndex + 1].id)
    }
  }

  function handlePrev() {
    const currentIndex = projects.findIndex(p => p.id === activeId)
    if (currentIndex > 0) {
      scrollToProject(projects[currentIndex - 1].id)
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    
    let scrollTimeout
      const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const center = track.scrollLeft + track.clientWidth / 2
        let closest = 0
        let closestDist = Infinity
        
        Array.from(track.children).forEach((child, i) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2
          const dist = Math.abs(center - childCenter)
          if (dist < closestDist) {
            closestDist = dist
            closest = i
          }
        })
        
        if (projects[closest]) {
          setActiveId(projects[closest].id)
        }
        }, 100)
    }
    
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  function handleKey(e){
    if(e.key === 'ArrowLeft') { handlePrev(); }
    if(e.key === 'ArrowRight') { handleNext(); }
  }

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className="projects-head">
          <h2>Proyectos</h2>
        </div>
        <div id="projects-track" className="projects-track" ref={trackRef} tabIndex={0} onKeyDown={handleKey}>
          {projects.map((p, idx) => (
            <div className={"projects-item" + (activeId === p.id ? ' is-active' : '')} key={p.id}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        <div className="projects-nav">
          <button className="nav-btn prev" onClick={handlePrev} aria-label="Anterior proyecto"><span className="icon">‹</span></button>
          <button className="nav-btn next" onClick={handleNext} aria-label="Siguiente proyecto"><span className="icon">›</span></button>
        </div>
      </div>
    </section>
  )
}
