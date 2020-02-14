import React from 'react'
import PropTypes from 'prop-types'

const Article = ({ children }) => (
  <React.Fragment>
    <article>{children}</article>
  </React.Fragment>
)

Article.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Article
