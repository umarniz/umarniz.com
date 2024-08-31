import React from 'react'
import Helmet from 'react-helmet'

import { MDXProvider } from "@mdx-js/react"

import Nav from './Nav'
import Footer from './Footer'

import '../style.css'
import '../new-moon.css'

import VideoPlayer from './mdx/VideoPlayer'
import SlidesViewer from './mdx/SlidesViewer'

const mdxComponents = {VideoPlayer, SlidesViewer}

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <html lang="en"/>
        <link rel="shortcut icon" type="image/png" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="496097ed-8151-4c01-9f87-ccab688479ee"></script>
      </Helmet>
      <Nav />
      <main className="main-container">
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </main>
      <Footer />
    </>
  )
}
