import React, { useState } from 'react';
import { Link } from 'gatsby'

const SlidesViewer = (props) => {
  const { path } = props

  var slidesStyle = {aspectRatio: "15 / 9"}
  var linkStyle = {
    fontSize: '1.2rem',
    fontWeight: '900',
  }

  var containerStyle = {
    textAlign: 'center'
  }

  return (
    <div style={containerStyle}>
      <object data={path} style={slidesStyle} width="100%" type="application/pdf">
        <div>No online PDF viewer installed</div>
      </object>
      <Link to={path} style={linkStyle}>Download slides</Link>
    </div>
  )
}

export default SlidesViewer;