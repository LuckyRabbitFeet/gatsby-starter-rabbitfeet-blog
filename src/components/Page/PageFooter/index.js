import React from 'react'
import PropTypes from 'prop-types'

import Comment from '../../Comment'

import styleList from './index.module.less'

const PageFooter = ({ title, comment }) => (
  <footer className={styleList.footer}>
    {comment === false ? null : <Comment title={title} />}
  </footer>
)

PageFooter.propTypes = {
  title: PropTypes.string,
  comment: PropTypes.bool,
}

export default PageFooter
