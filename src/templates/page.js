import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'

export default function PageTemplate({ data, children }) {
  const post = data.mdx
  const { tags, categories, cardImage, title, description, date, role, event, location } = post.frontmatter

  const postDate = new Date(post.frontmatter.date)

  const formattedDate = postDate.toLocaleString('en-US', { month: 'short', year:'numeric'})

  var postType = 'Blog'
  if (categories && categories.includes('Projects')) {
    postType = 'Project'
  } else if (categories && categories.includes('Talks')) {
    postType = 'Talk'
  }
  
  return (
    <Layout>
      <Helmet
        title={`${
          post.frontmatter.title
        } | ${config.siteTitle}`}
      />
      <SEO />
      <header>
        <div className="container justify-center">
          <h1>{post.frontmatter.title}</h1>
          { postType == 'Project' &&
            <p className="smallSubtitle">{formattedDate} | {post.frontmatter.role}</p>
          }
          { postType == 'Talk' &&
            <p className="smallSubtitle">{formattedDate} | {post.frontmatter.location}</p>
          }
        </div>
      </header>
      <section className="container page">
        {children}
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        date
        role
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
`
