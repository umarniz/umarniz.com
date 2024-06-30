import React from 'react';
import { StaticImage } from "gatsby-plugin-image"

export default function Blurb({ title, children }) {
  return (
    <section className="blurb">
      <div className="container">
        <div>  
          <StaticImage src="../static/me_round_512.png"
                placeholder="blurred"
                alt="Umar Nizamani's Profile Photo"
                className="avatar"
          />
        </div>
        <div>
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </section>
  )
}
