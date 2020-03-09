import React from 'react'
import PropTypes from 'prop-types'

const Bodytext = ({ html }) => (
  <React.Fragment>
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
  </React.Fragment>
)

Bodytext.propTypes = {
  html: PropTypes.string.isRequired,
}

export default Bodytext
