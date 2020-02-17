import React from 'react'
import PropTypes from 'prop-types'

import Comment from '../../Comment'

import styleList from './index.module.less'

const PageFooter = ({ comment }) => (
  <footer className={styleList.footer}>
    {comment === false ? null : <Comment />}
  </footer>
)

PageFooter.propTypes = {
  comment: PropTypes.bool,
}

export default PageFooter
