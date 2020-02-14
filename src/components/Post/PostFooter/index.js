import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import {
  FaCreativeCommons,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa'

import Comment from '../../Comment'

import styleList from './index.module.less'

const PostFooter = ({
  next: {
    fields: { slug: nextSlug } = {},
    frontmatter: { title: nextTitle } = {},
  } = {},
  prev: {
    fields: { slug: prevSlug } = {},
    frontmatter: { title: prevTitle } = {},
  } = {},
  comment,
}) => (
  <footer className={styleList.footer}>
    <div className={styleList.cc}>
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FaCreativeCommons />
        知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
      </a>
    </div>
    <div className={styleList.context}>
      {prevSlug && (
        <div className={styleList.prev}>
          <Link to={prevSlug}>
            <FaAngleDoubleLeft />
            上一篇: {prevTitle}
          </Link>
        </div>
      )}
      {nextSlug && (
        <div className={styleList.next}>
          <Link to={nextSlug}>
            下一篇: {nextTitle}
            <FaAngleDoubleRight />
          </Link>
        </div>
      )}
    </div>
    {comment === false ? null : <Comment />}
  </footer>
)

PostFooter.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
  comment: PropTypes.bool,
}

export default PostFooter
