import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FaRegClock, FaTags, FaAngleDoubleRight } from 'react-icons/fa'

import config from '../../../../config'

import styleList from './index.module.less'

const Post = ({
  post: {
    excerpt,
    fields: { slug },
    frontmatter: { title, date, cat, tags },
  },
}) => {
  const categroy = config.category[cat] ? config.category[cat].name : '未知'
  const categroyStyle = {
    background: config.category[cat] && config.category[cat].color,
  }
  return (
    <section className={styleList.post}>
      <div className={styleList.heading}>
        <span
          className={styleList.cat}
          style={config.category[cat] && categroyStyle}
        >
          {categroy}
        </span>
        <h2>
          <Link to={slug}>{title}</Link>
        </h2>
      </div>
      <div className={styleList.content}>
        <p className={styleList.frontmatter}>
          <FaRegClock />
          <span className={styleList.date}>发布于 {date}</span>
          <FaTags />
          {tags &&
            tags.map(tag => (
              <span key={tag} className={styleList.tag}>
                {tag}
              </span>
            ))}
        </p>
        <p className={styleList.excerpt}>{excerpt}</p>
        <div className={styleList.readAll}>
          <Link to={slug}>
            阅读全文
            <FaAngleDoubleRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
