import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Seo from '../components/SEO'
import Article from '../components/Article'
import Page from '../components/Page'

const PageTemplate = ({ data: { page } }) => (
  <React.Fragment>
    <Seo title={page.frontmatter.title} description={page.excerpt} />
    <Article>
      <Page page={page} />
    </Article>
  </React.Fragment>
)

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PageTemplate

export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        subtitle
        comment
      }
    }
  }
`
