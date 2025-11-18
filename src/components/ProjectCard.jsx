import React from 'react'

export default function ProjectCard({ project }) {
  return (
    <article className="project-card" aria-labelledby={`title-${project.id}`}>
      <div className="project-frame">
        <div className="frame-top" aria-hidden="true">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
        <div className="thumb" style={{backgroundImage:`url(${project.image || ''})`}} />
      </div>
      <div className="project-body">
        <h3 id={`title-${project.id}`}>{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-meta">
          <div className="tags">{(project.tags||[]).map(t=> <span key={t} className="tag">{t}</span>)}</div>
          <div className="links" />
        </div>
        <div className="project-extra" aria-hidden="true">
          <p className="project-long">{project.details}</p>
          <div className="project-extra-actions">
            {project.link && <a className="btn primary small" href={project.link} target="_blank" rel="noreferrer">Ver página</a>}
            {project.repo ? (
              <a className="btn contact small" href={project.repo} target="_blank" rel="noreferrer">Ver Repo</a>
            ) : (
              <a className="btn contact small" href="#contact">Contacto</a>
            )}
          </div>
        </div>
      </div>
      <div className="project-preview">
          <div className="preview-inner">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
          </div>
      </div>
    </article>
  )
}
