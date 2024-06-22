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

  const isPopular = node.categories && node.categories.includes('Popular')

  let formattedDate
  if (node.date) {
    const dateArr = node.date.split(' ')
    dateArr.pop()
    dateArr[0] = dateArr[0].slice(0, 3)
    formattedDate = dateArr.join(' ').slice(0, -1)
  }

  return (
    <div className="post" key={node.id}>
      <Link to={node.slug}>
        <div className="post-row">
        {formattedDate && <time>{formattedDate}</time>}

        <div className="post-column">
        {/* <div className="post-row"> */}
          <h3>{node.title}</h3>
          <h3>{node.location}</h3>
        {/* </div> */}
        {/* <div className="post-row"> */}
        <h5>{node.summary}</h5>

        {node.images.map(image => (
          <GatsbyImage
              placeholder="blurred"
              image={image.childImageSharp.gatsbyImageData}
              // imgStyle={imageBGStyle}
              // style={imageBGStyle}
              alt=""
              // key={image.id && console.log('Image ID', image.id)}
          />
        ))}
        </div>
        </div>
      </Link>
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