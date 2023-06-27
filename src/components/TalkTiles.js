import React, { useMemo } from 'react'
import TalkCard from './TalkCard.js'

export default function TalkTiles({ data }) {
  const talkStyleOverride = {
    maxWidth: "600px"
  }

  const talksByYear = {}

  data.forEach((talk) => {
    const year = talk.date?.split(', ')[1]
    talksByYear[year] = [...(talksByYear[year] || []), talk]
  })

  const talkYears = useMemo(() => Object.keys(talksByYear).reverse(), [talksByYear])
  
  return talkYears.map((year) => (
    <section key={year}>
      <h2>{year}</h2>
      <div className="projects">
      {talksByYear[year].map((talk) => {
        console.log(talk)
        return (
          <div className="project" style={talkStyleOverride} key={talk.title}>
            <TalkCard
              title={talk.title}
              link={talk.slug}
              event={talk.event}
              location={talk.location}
              bg={talk.cardImage}
            >
            </TalkCard>
          </div>
        )
      })}
    </div>
    </section> 
  ))
}