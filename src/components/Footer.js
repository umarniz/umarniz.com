import React from 'react'
import { Link } from 'gatsby'

// import netlify from '../../content/thumbnails/netlify.png'
// import gatsby from '../../content/thumbnails/gatsby.png'
// import github from '../../contentsby t/thumbnails/github.png'

// import pgp_key from '/static/files/umar_nizamani_public_key.txt'

export default function Footer() {
  return (
    <footer>
      <section className="container">
        <hr/>
        <nav className="justify-center">
          <a href="https://twitter.com/Rapchik">Twitter</a> | <a  href="https://github.com/umarniz/">Github</a> | <a href="https://www.linkedin.com/in/umar-nizamani-aab50a16/">LinkedIn</a>
          <br/>
          Copyright {new Date().getFullYear()} Umar Nizamani. <a href="/files/umar_nizamani_public_key.txt">PGP Key</a> 
        </nav>
      </section>
    </footer>
  )
}
