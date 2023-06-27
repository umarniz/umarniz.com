import React from 'react';
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
export default function TalkCard({ link, title, event, location, children, bg }) {

    const imageStyle = {
        height: '100%',
        minHeight: '250px',
        objectFit: 'contain',
        zIndex: 100,
        padding: 0,
        margin: 0,
        display: "block",
        position: "absolute",
        border: "2px solid rgba(0, 0, 0, .5)"
    }

    const imageBGStyle = {
        padding: 0,
        margin: 0,
        height: '100%',
        minHeight: '250px',
        objectFit: 'fill',
        zIndex: 2,
        border: "2px solid rgba(0, 0, 0, .5)"
    }

    const titleStyle = {
        letterSpacing: "-0.05rem",
        fontSize: "1.8rem",
        textDecoration: "",
        paddingBottom: "0.5rem",
        marginBottom: "0.5rem",
        minHeight: "3.0rem"
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
    }

    const sectionStyle = {
        margin: 0,
        padding: 0,
        align: "center",
        textAlign: "center",
        width: "100%",
    }

    return (
        <section style={sectionStyle}>
            <h1 style={titleStyle}>{title}</h1>
            <h5 style={eventTextStyle}>{event}</h5>
            <h5 style={locationTextStyle}>📍{location}</h5>
            <Link to={link} className="talk-card">
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
            </Link>
        </section>
    )
}