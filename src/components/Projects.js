import React from 'react'
import ProjectCard from './ProjectCard.js'

export default function Projects({ data }) {
  return (
    <div className="projects">
      {data.map((node) => {
        return (
          <div className="project" key={node.title}>
            <ProjectCard
              title={node.title}
              link={node.slug}
              bg={node.cardImage}
            >
              {node.description}
            </ProjectCard>
          </div>
        )
      })}
    </div>
  )
}
