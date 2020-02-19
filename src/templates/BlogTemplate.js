import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import PostList from '../components/PostList'
import PageNumber from '../components/PageNumber'

const BlogTemplate = ({
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

BlogTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object.isRequired,
}

export const query = graphql`
  fragment PostList on MarkdownRemark {
    id
    excerpt(pruneLength: 200, truncate: true)
    fields {
      slug
    }
    frontmatter {
      title
      date(formatString: "YYYY.MM.DD")
      cat
      tags
    }
  }

  query($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts//" } }
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

export default BlogTemplate
