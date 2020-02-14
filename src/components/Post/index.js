import React from 'react'
import PropTypes from 'prop-types'

import PostTitle from './PostTitle'
import BodyText from '../Article/Bodytext'
import PostFooter from './PostFooter'

const Post = ({ post: { html, frontmatter }, next, prev }) => {
  return (
    <React.Fragment>
      <PostTitle frontmatter={frontmatter} />
      <BodyText html={html} />
      <PostFooter next={next} prev={prev} comment={frontmatter.comment} />
    </React.Fragment>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
}

export default Post
