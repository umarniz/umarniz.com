import React, { useMemo } from 'react'
import TalkCard from './TalkCard.js'

export default function TalkTiles({ data }) {
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
          <div className="project" key={talk.title}>
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

{/*     
      <div className="posts">
        {postsByYear[year].map((node) => (
          <Cell key={node.id} node={node} />
        ))}
      </div>*/}
    </section> 
  ))

  return (
    <div className="projects">
      {data.map((talk) => {
        console.log(talk)
        return (
          <div className="project" key={talk.title}>
            <TalkCard
              title={talk.title}
              link={talk.slug}
              bg={talk.cardImage}
            >
            </TalkCard>
          </div>
        )
      })}
    </div>
  )
}

//   return years.map((year) => (
//     <section key={year}>
//       <h2>{year}</h2>
//       <div className="posts">
//         {postsByYear[year].map((node) => (
//           <Cell key={node.id} node={node} />
//         ))}
//       </div>
//     </section>
//   ))

//   return (
//     <div className="projects">
//       {data.map((node) => {
//         return (
//           <div className="project" key={node.title}>
//             <TalkCard
//               title={node.title}
//               link={node.slug}
//               bg={node.cardImage}
//             >
//             </TalkCard>
//           </div>
//         )
//       })}
//     </div>
//   )
// }
