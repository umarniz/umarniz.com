import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function BlogIndex({ data, ...props }) {
  const posts = data.allMdx.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <Layout>
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <SEO customDescription="Articles, tutorials, snippets, musings, and everything else." />
      <header>
        <div className="container">
          <h1>Blog</h1>
          <p className="subtitle">
            Posts, tutorials, snippets, musings, notes, and everything else. The
            archive of everything I've written.
          </p>
        </div>
      </header>
      <section>
        <div className="container">
          <Search posts={simplifiedPosts} {...props} />
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
    allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
  }
`
