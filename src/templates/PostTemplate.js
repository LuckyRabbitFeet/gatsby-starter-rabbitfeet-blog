import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import Article from '../components/Article'
import Post from '../components/Post'

const BlogPost = ({ data: { post }, pageContext: { next, prev } }) => (
  <React.Fragment>
    <SEO title={post.frontmatter.title} description={post.excerpt} />
    <Article>
      <Post post={post} next={next} prev={prev} />
    </Article>
  </React.Fragment>
)

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        cat
        tags
        comment
      }
    }
  }
`
export default BlogPost
