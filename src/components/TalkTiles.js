import React from 'react'
import TalkCard from './TalkCard.js'

export default function TalkTiles({ data }) {
  data.forEach((post) => {
    const year = post.date?.split(', ')[1]

    postsByYear[year] = [...(postsByYear[year] || []), post]
  })

  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])

  return (
    <div className="projects">
      {years.map((node) => {
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

  return years.map((year) => (
    <section key={year}>
      <h2>{year}</h2>
      <div className="posts">
        {postsByYear[year].map((node) => (
          <Cell key={node.id} node={node} />
        ))}
      </div>
    </section>
  ))

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
