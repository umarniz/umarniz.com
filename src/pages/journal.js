import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Search from '../components/Search'
import SEO from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import Journals from '../components/Journals'

export default function JournalIndex({ data, ...props }) {
  const journals = data.allMdx.edges
  // const photos = data.allFile
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(journals), [journals])

  return (
    <Layout>
        <Helmet title={`Journal | ${config.siteTitle}`} />
        <SEO customDescription="My diary, open for the world." />
        <div className="container page">
        <div className='full-width-container'>
        <header>
        <div className="container">
          <h1>Journal</h1>
          <p className="subtitle">
          My thoughts, emotions and observations. Open to the world.
          </p>
        </div>
      </header>
        <section>
            <div className="container">
              <Journals data={simplifiedPosts} showYears />
            <div>
            </div>
            </div>
      </section>
    </div>
    </div>
  </Layout>
  )
}

export const pageQuery = graphql`
  query JournalQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "journal" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            folderPath
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
            summary
            location
          }
          images {
            childImageSharp {
                gatsbyImageData(
                  height: 300
                  width: 300
                  placeholder: BLURRED
                )
              }
          }
        }
      }
    }
  }
`
