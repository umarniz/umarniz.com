import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import TalkTiles from '../components/TalkTiles'

export default function TalksIndex({ data, ...props }) {
  const talks = data.allMdx.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(talks), [talks])

  return (
    <Layout>
      <Helmet title={`Talks | ${config.siteTitle}`} />
      <SEO customDescription="Speaking at conferences. Keynotes, Lectures, meetups and everything in between." />
      <div className="container page">
        <div className='full-width-container'>
      <header>
          <h1>Talks</h1>
          <p className="subtitle">
            A collection of talks I have given.
          </p>
      </header>
      <TalkTiles data={simplifiedPosts} {...props} />
      </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
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
            cardImage {
                childImageSharp {
                  gatsbyImageData(
                    width: 1200
                    placeholder: BLURRED
                  )
                }
              }
          }
        }
      }
    }
  }`