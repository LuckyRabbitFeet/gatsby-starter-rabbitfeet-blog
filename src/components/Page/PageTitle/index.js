import React from 'react'
import PropTypes from 'prop-types'

import styleList from './index.module.less'

const PageTitle = ({ title, subtitle }) => (
  <header className={styleList.header}>
    <h1>
      {title}
      {subtitle ? <span>{subtitle}</span> : null}
    </h1>
  </header>
)

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default PageTitle
