import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link} from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Projects from '../components/Projects'
import config from '../utils/config'
import { getSimplifiedPosts } from '../utils/helpers'

export default function ProjectsIndex({data}) {
  const projects = data.allMdx.edges
  const simplifiedProjects = useMemo(() => getSimplifiedPosts(projects), [projects])
  
  const nicedayWork = simplifiedProjects.filter(project => project.categories.includes('NiceDay') )

  const nerdiacsGamesAndProducts = simplifiedProjects.filter(project => project.categories.includes('Nerdiacs') && project.categories.includes('Products'))
  const nerdiacsProjects = simplifiedProjects.filter(project => project.categories.includes('Nerdiacs') && !project.categories.includes('Products') && !project.categories.includes('Games') )

  return (
    <Layout>  
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO/>
      <div className="container page">
        <div className='full-width-container'>
        <header>
          <h1>Projects</h1>
          <p className="subtitle">
            A selection of things I have worked on with various tech stacks and technologies.
          </p>
        </header>
        
        <h2 className="section-title">Sense Health / NiceDay Nederland - Products | 2016 onwards </h2>
        <Projects data={nicedayWork} />

        <h2 className="section-title">Nerdiacs - Games & Products | 2009 - 2015</h2>
        <Projects data={nerdiacsGamesAndProducts} />

        <h2 className="section-title">Nerdiacs - Projects | 2014 - 2016</h2>
        <Projects data={nerdiacsProjects} />
        </div>
      </div>
    </Layout>
  )
}

export const projectQuery = graphql`
  query ProjectsQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "page" }, categories: { eq: "Projects"} } }
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