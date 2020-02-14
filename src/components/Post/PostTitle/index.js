import React from 'react'
import PropTypes from 'prop-types'
import { FaRegClock } from 'react-icons/fa'
import { Link } from 'gatsby'

import config from '../../../../config'
import styleList from './index.module.less'

const PostTitle = ({ frontmatter: { title, date, cat, tags } }) => {
  const categroy = config.category[cat] ? config.category[cat].name : '未知'
  const categroyStyle = {
    background: config.category[cat] && config.category[cat].color,
  }
  return (
    <header className={styleList.header}>
      <div className={styleList.cateDate}>
        <div className={styleList.catTags}>
          <span className={styleList.cat} style={categroyStyle}>
            {cat ? (
              <Link to={config.navPath('cat', cat)}>{categroy}</Link>
            ) : (
              categroy
            )}
          </span>
          {tags &&
            tags.map(item => (
              <span key={item} className={styleList.tag}>
                <Link to={config.navPath('tag', item)}>{item}</Link>
              </span>
            ))}
        </div>
        <div className={styleList.date}>
          {date && (
            <span>
              <FaRegClock />
              {date}
            </span>
          )}
        </div>
      </div>
      <h1 className={styleList.title}>{title}</h1>
    </header>
  )
}

PostTitle.propTypes = {
  frontmatter: PropTypes.object.isRequired,
}

export default PostTitle
