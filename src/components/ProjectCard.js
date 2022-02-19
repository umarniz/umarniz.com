import React from 'react';
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
export default function ProjectCard({ link, title, children, bg }) {

    const imageStyle = {
        borderRadius: '1rem',
        height: '100%',
        minHeight: '250px',
        // maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)',
        // maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
        // webkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
    }

    const titleStyle = {
        position: 'absolute',
        top: '18%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    }

    const descriptionStyle = {
        position: 'absolute',
        bottom: '0%',
        left: '0%',
        textAlign: 'bottom'
    }

    return (
        <Link to={link} className="project-card">
            <GatsbyImage
                placeholder="blurred"
                image={bg.childImageSharp.gatsbyImageData}
                imgStyle={imageStyle}
                style={imageStyle}
                alt={title}
            />
            <div className="project-card-title" style={titleStyle}>{title}</div>
            <div className="project-card-description" style={descriptionStyle}>{children}</div>
        </Link>
    )
}