import React, { useMemo } from 'react'
import JournalCard from './JournalCard.js'
import { Link } from 'gatsby'

export default function JournalTiles({ data }) {
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
            <Link to={talk.slug}>
                <div className="post-row">
                {/* {formattedDate && <time>{formattedDate}</time>} */}
                <h3>{talk.title}</h3>
                </div>
                {/* {isNew && <div className="new-post">New!</div>} */}
                {/* {isPopular && <div className="popular-post">Popular</div>} */}
            </Link>
            
        //   <div className="project" style={talkStyleOverride} key={talk.title}>
        //     <p>{talk.title}</p>
        //     {/* <JournalCard
        //       title={talk.title}
        //       link={talk.slug}
        //       event={talk.event}
        //       location={talk.location}
        //       bg={talk.cardImage}
        //     >
        //     </JournalCard> */}
        //   </div>
        )
      })}
    </div>
    </section> 
  ))
}