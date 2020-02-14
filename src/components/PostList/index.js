import React from 'react'
import PropTypes from 'prop-types'

import Post from './Post'

const PostList = ({ posts }) => (
  <div>
    {posts.length > 0 ? (
      posts.map(({ node }) => <Post key={node.id} post={node} />)
    ) : (
      <p>没有文章</p>
    )}
  </div>
)

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList
