import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.mdx
  const { tags, categories, cardImage, title, description, date, role } = post.frontmatter

  const postDate = new Date(post.frontmatter.date)

  const formattedDate = postDate.toLocaleString('en-US', { month: 'short', year:'numeric'})

  var isProjectPage = false
  if (categories && categories.includes('Projects')) {
    isProjectPage = true
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
          { isProjectPage &&
            <p className="smallSubtitle">{formattedDate} | {post.frontmatter.role}</p>
          }
        </div>
      </header>
      <section className="container page">
        <MDXRenderer frontmatter={post.frontmatter}>{post.body}</MDXRenderer>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        date
        role
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
