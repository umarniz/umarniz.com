import React from 'react';
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
export default function TalkCard({ link, title, event, location, children, bg }) {

    const imageStyle = {
        borderRadius: '1rem',
        height: '100%',
        minHeight: '250px',
        align: "center",
        // maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)',
        // maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
        // webkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%)',
    }

    const titleStyle = {
        letterSpacing: "-0.05rem",
        fontSize: "1.8rem",
        // fontWeight: 100,
        textDecoration: "",
        paddingBottom: "0.5rem",
        marginBottom: "0.5rem",
        // margin: "1.0rem",
    }

    const eventTextStyle = {
        fontSize: "1.5rem",
        fontWeight: 100,
        letterSpacing: "-0.05rem",
        padding: 0,
        margin: 0,
    }

    const locationTextStyle = {
        padding: 0,
        margin: 0,
        fontSize: "1.2rem",
        fontWeight: 200,
        // letterSpacing: "-0.05rem",
    }


    const sectionStyle = {
        margin: 0,
        padding: 0,
        align: "center",
        textAlign: "center",
    }

    return (
        <section style={sectionStyle}>
            <h1 style={titleStyle}>{title}</h1>
            <h5 style={eventTextStyle}>{event}</h5>
            <h5 style={locationTextStyle}>📍{location}</h5>
            <Link to={link} className="project-card">
                <GatsbyImage
                    placeholder="blurred"
                    image={bg.childImageSharp.gatsbyImageData}
                    imgStyle={imageStyle}
                    style={imageStyle}
                    alt={title}
                />
            </Link>
        </section>
    )
}