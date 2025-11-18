import React from 'react'
import emailIcon from '../assets/email.png'
import phoneIcon from '../assets/phone.png'
import githubIcon from '../assets/github.png'

export default function Contact(){
  return (
    <section className="contact container" id="contact">
      <h2>Contacto</h2>
      <div className="contact-content">
        <p>Interesado en colaborar o ver el código? Puedes ver mis repos o enviarme un mensaje a través de mi perfil de GitHub, llamarme o escribirme un correo.</p>
        <div className="contact-buttons">
          <a href="mailto:Kevingmp18@gmail.com?subject=Contacto%20desde%20portafolio" className="contact-btn email" target="_blank" rel="noreferrer">
            <img src={emailIcon} alt="Email" className="btn-icon-img" />
            <span className="btn-label">Email</span>
          </a>
          <a href="tel:+529811979815" className="contact-btn phone" target="_blank" rel="noreferrer">
            <img src={phoneIcon} alt="Teléfono" className="btn-icon-img" />
            <span className="btn-label">Llamar</span>
          </a>
          <a href="https://github.com/kerin258" className="contact-btn github" target="_blank" rel="noreferrer">
            <img src={githubIcon} alt="GitHub" className="btn-icon-img" />
            <span className="btn-label">GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}
