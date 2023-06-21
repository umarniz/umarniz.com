import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function TalksIndex({ data, ...props }) {
  const talks = data.allMdx.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(talks), [talks])

  return (
    <Layout>
      <Helmet title={`Talks | ${config.siteTitle}`} />
      <SEO customDescription="Speaking at conferences. Keynotes, Lectures, meetups and everything in between." />
      <header>
        <div className="container">
          <h1>Talks.</h1>
          <p className="subtitle">
            A collection of talks I have given.
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

export const projectQuery = graphql`
  query TalksQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "page" }, categories: { eq: "Talks"} } }
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
            event
            location
            categories
          }
        }
      }
    }
  }`