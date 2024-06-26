import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from '../components/Layout'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'
import Comment from '../components/Comment'
import Blurb from '../components/Blurb'
import config from '../utils/config'
import { slugify } from '../utils/helpers'
import { MDXRenderer } from "gatsby-plugin-mdx"
import Gallery from '@browniebroke/gatsby-image-gallery'

export default function JournalTemplate({ data, pageContext }) {
    const post = data.mdx
    
    const images = post.images.map(image => image.childImageSharp)

    const { previous, next } = pageContext
    const { tags, cover, coverCaption, title, description, date, location } = post.frontmatter

    return (
        <Layout>
            {cover && (
                <figure>
                    <GatsbyImage
                        layout="fullWidth"
                        placeholder="blurred"
                        image={cover.childImageSharp.gatsbyImageData}
                        className="full-width-cover"
                    />
                    <figcaption>{coverCaption}</figcaption>
                </figure>
            )}
            <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
            <SEO postPath={post.fields.slug} postNode={post} postSEO />
            <div className="container padded-bottom">
                <article>
                    <header className="article-header">
                        <div className="container">
                            <div className="thumb">
                                <div>
                                    <h1>{title}</h1>
                                    {/* <h1>{title}</h1> */}
                                    <div className="post-meta">
                                        <div>
                                            {/* By <Link to="/me">Umar Nizamani</Link> on{' '} */}
                                            <time>{date}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {description && <p className="description">{description}</p>}


                    </header>
                  
                    <MDXRenderer className="article-post">{post.body}</MDXRenderer>

                    <Gallery images={images} imgClass="clickable-image" />
                    
                    {tags && (
                        <div className="tags">
                            {tags.map((tag) => (
                                <Link
                                    key={tag}
                                    to={`/tags/${slugify(tag)}`}
                                    className={`tag-${tag}`}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>)}
                </article>
            </div>
            <Blurb title="Hey, I'm Umar!">
                <h5> Managing Director, <a href="https://nicedaytherapy.com">NiceDay International</a></h5>
                <p>
                    15 years experience building 1-50 people companies.
                    Engineer and tinkerer at heart. Love building products.
                </p>
                <Link to="/me">More about me</Link>.
            </Blurb>
            <div className="container">
                <Suggested previous={previous} next={next} />
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query JournalsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
        body
        excerpt
        fields {
            slug
        }
        frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            description
            location
            series
            coverCaption
            cover {
                childImageSharp {
                    gatsbyImageData(
                        width: 1200
                        placeholder: BLURRED
                    )
                }
            }
        }
        images {
            childImageSharp {
                thumb: gatsbyImageData(
                    width: 300
                    height: 300
                    placeholder: BLURRED)
                full: gatsbyImageData(layout: FULL_WIDTH)
            }
        }
    }
  }
`
