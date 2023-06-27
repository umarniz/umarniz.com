import React from 'react';
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
export default function ProjectCard({ link, title, children, bg }) {

    const imageStyle = {
        borderRadius: '1rem',
        height: '100%',
        minHeight: '250px',
        objectFit: 'contain',
        zIndex: 100,
        padding: 0,
        margin: 0,
        display: "block",
        position: "absolute",
        WebkitMaskImage: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 80%, rgba(255,255,255,0) 95%, rgba(255,255,255,0) 100%)",
    }

    const imageBGStyle = {
        padding: 0,
        margin: 0,
        height: '100%',
        minHeight: '250px',
        objectFit: 'cover',
        zIndex: 1,
        display: "block",
        filter: "blur(5px)",
        WebkitFilter: "blur(5px)",
    }

    const titleStyle = {
        position: 'absolute',
        top: '18%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 101,
    }

    const descriptionStyle = {
        position: 'absolute',
        bottom: '0%',
        left: '0%',
        textAlign: 'bottom',
        zIndex: 102,
    }

    return (
        <Link to={link} className="project-card">
            <GatsbyImage
                placeholder="blurred"
                image={bg.childImageSharp.gatsbyImageData}
                imgStyle={imageBGStyle}
                style={imageBGStyle}
                alt={title}
            />
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