import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

import styleList from './index.module.less'

const Layout = ({ children }) => {
  const {
    tags: { group: tags = [] },
  } = useStaticQuery(
    graphql`
      query {
        tags: allMarkdownRemark {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
      }
    `
  )
  tags.sort((a, b) => {
    return b.totalCount - a.totalCount
  })

  return (
    <React.Fragment>
      <Header />
      <div className={styleList.row}>
        <div className={styleList.container}>
          <main>{children}</main>
        </div>
        <div className={styleList.side}>
          <Sidebar tags={tags} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Layout
