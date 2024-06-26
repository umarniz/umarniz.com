import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Guides from '../components/Guides'
import SEO from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function CategoryTemplate({ data, pageContext }) {
  let { category } = pageContext
  const { totalCount } = data.allMdx
  const posts = data.allMdx.edges
  const simplifiedPosts = useMemo(
    () => getSimplifiedPosts(posts),
    [posts]
  )
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <Layout>
      <Helmet title={`${category} | ${config.siteTitle}`} />
      <SEO />
      <header>
        <div className="container">
          <h1>{category}</h1>
          <p className="subtitle">
            <span className="count">{totalCount}</span>
            {message}
          </p>
        </div>
      </header>
      <section className="container">
        <Guides data={simplifiedPosts} includeTime />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
  allMdx(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {categories: {in: [$category]}}}
  ) {
    totalCount
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          tags
          categories
          series
        }
      }
    }
  }
}
`
