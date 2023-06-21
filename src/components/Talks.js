import React from 'react'
import TalkCard from './TalkCard.js'

export default function Talks({ data }) {
  return (
    <div className="projects">
      {data.map((node) => {
        return (
          <div className="project" key={node.title}>
            <TalkCard
              title={node.title}
              link={node.slug}
              bg={node.cardImage}
            >
            </TalkCard>
          </div>
        )
      })}
    </div>
  )
}
