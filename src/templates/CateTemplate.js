import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PostList from '../components/PostList'
import PageNumber from '../components/PageNumber'

const CateTemplate = ({
  data: {
    posts: { edges: posts = [] },
  },
  pageContext: { rootPath, seo, numPages, currentPage },
}) => (
  <React.Fragment>
    <SEO title={seo.title} description={seo.description} />
    <PostList posts={posts} />
    <PageNumber
      rootPath={rootPath}
      numPages={numPages}
      currentPage={currentPage}
    />
  </React.Fragment>
)

CateTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object.isRequired,
}

export const query = graphql`
  query($skip: Int!, $limit: Int!, $cat: String!) {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        frontmatter: { cat: { eq: $cat } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...PostList
        }
      }
    }
  }
`

export default CateTemplate
