import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import styleList from './index.module.less'

const isHomePath = path => {
  return path === '' ? '/' : path
}

const PageNumber = ({ rootPath, numPages, currentPage }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? isHomePath(rootPath)
      : `${rootPath}/${(currentPage - 1).toString()}`
  const nextPage = `${rootPath}/${(currentPage + 1).toString()}`

  return (
    <div className={styleList.container}>
      <ul>
        {!isFirst && (
          <li className={styleList.prev}>
            <Link to={prevPage} rel="prev">
              <p>上一页</p>
            </Link>
          </li>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li key={i}>
            <Link
              key={`pagination-number${i + 1}`}
              to={i === 0 ? isHomePath(rootPath) : `${rootPath}/${i + 1}`}
              activeClassName={styleList.active}
            >
              <p>{i + 1}</p>
            </Link>
          </li>
        ))}
        {!isLast && (
          <li className={styleList.next}>
            <Link to={nextPage} rel="next">
              <p>下一页</p>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

PageNumber.propTypes = {
  rootPath: PropTypes.string.isRequired,
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default PageNumber
