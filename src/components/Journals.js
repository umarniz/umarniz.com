import React, { useMemo } from 'react'
import { Link } from 'gatsby'

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
          <h3>{node.title}</h3>
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
  })

  const journalYears = useMemo(() => Object.keys(journalsByYear).reverse(), [journalsByYear])
  
  if (showYears) {
    return journalYears.map((year) => (
      <section key={year}>
        <h2>{year}</h2>
        <div className="posts">
          {journalsByYear[year].map((node) => (
            <Cell key={node.id} node={node} />
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
