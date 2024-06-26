import React, { useMemo } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

const Cell = ({ node }) => {
  const date = new Date(node.date)
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  let isNew = false

  if (date > oneMonthAgo) {
    isNew = true
  }

  let formattedDate
  if (node.date) {
    const dateArr = node.date.split(' ')
    dateArr.pop()
    dateArr[0] = dateArr[0].slice(0, 3)
    formattedDate = dateArr.join(' ').slice(0, -1)
  }

  console.log(node)
  const countOfImages = node.images.length

  return (
    <div className="post" key={node.id}>
      <div className="journal-row">
      <Link to={node.slug}>
        <div className="post-column">
        <div className="post-row">
        <div className="post-column">
          {/* <h5> { node.series} </h5> */}
          <div className="post-row">
            
            {formattedDate && <time>{formattedDate}</time>}
            <h3>{node.title}</h3>

            {node.distanceFromLastLocationInKM != 0 && (
                <div className='journal-icons'>
                  {/* <p className="journal-summary"> */}
                    ✈️ { Number(node.distanceFromLastLocationInKM).toLocaleString("nl-nl") + 'KM' }
                  {/* </p> */}
                </div>
            )}
            <div className='journal-icons'>
              {/* <p className="journal-summary"> */}
                📸 {countOfImages}
              {/* </p> */}
            </div>
          </div>
          
          <br></br>
          <p className="journal-summary">{node.summary}</p>
        </div>
        </div>
        <div className='masonry-layout-parent'>
          <div className="masonry-layout">
            {node.images.slice(0, 4).map(image => (
              <GatsbyImage
                placeholder="blurred"
                image={image.childImageSharp.gatsbyImageData}
                alt=""
              />
            ))}
            </div>
          </div>
        </div>
      </Link>
      {/* <hr></hr> */}
      </div>
     </div>
  )
}

export default function Journals({ data, showYears }) {
  const journalsByYear = {}

  data.forEach((journal) => {
    const year = journal.date?.split(', ')[1]

    journalsByYear[year] = [...(journalsByYear[year] || []), journal]

    // console.log('Images', journal.images)
  })

  const journalYears = useMemo(() => Object.keys(journalsByYear).reverse(), [journalsByYear])

  if (showYears) {
    return journalYears.map((year) => (
      <section key={year}>
        <h2>{year}</h2>
        <div className="posts">
          {journalsByYear[year].map((node) => (
            <div>
              <Cell key={node.id} node={node} />
            </div>
          ))}
        </div>
      </section>
    ))
  } else {
    return (
      <div className="posts">
        {data.map((node) => (
          <Cell key={node.id} node={node} />
        ))}
      </div>
    )
  }
}