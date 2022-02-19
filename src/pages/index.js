import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Guides from '../components/Guides'
import Projects from '../components/Projects'
import SEO from '../components/SEO'
import Blurb from '../components/Blurb'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import speaking from '../data/speaking'

export default function BlogIndex({ data }) {
  const latest = data.latest.edges
  const projects = data.projects.edges

  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedProjects = useMemo(() => getSimplifiedPosts(projects), [projects])

  const Section = ({ title, children, viewAllURL, ...props }) => (
    <section {...props}>
      <h2 className="section-title">
        {title}
        {viewAllURL && (
          <Link className="section-button" to={viewAllURL}>
            View all
          </Link>
        )}
      </h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <Blurb title="Hey, I'm Umar!">
        <h5> CTO, NiceDay Nederland </h5>
        <p>
          15 years experience building 1-50 people companies.
          Engineer and tinkerer at heart. Love building products.
        </p>
      </Blurb>
      <div className="container index">
        <Section title="Recent Posts"  viewAllURL="/blog">
          <Posts data={simplifiedLatest} />
        </Section>
        <Section title="Projects"  viewAllURL="/projects">
          <Projects data={simplifiedProjects} />
        </Section>
        <Section title="Speaking">
          <Guides data={speaking} frontPage />
        </Section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
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
          }
        }
      }
    }
    popular: allMdx(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
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
          }
        }
      }
    }
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "page" }, categories: { in: ["Projects"], eq: "Featured" } } }
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
            description
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
  }
`
