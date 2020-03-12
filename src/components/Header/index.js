import React from 'react'
import { Link } from 'gatsby'

import config from '../../../config'

import styleList from './index.module.less'

const Header = () => (
  <header className={styleList.header}>
    <h1>
      <Link to="/">{config.meta.siteTitle}</Link>
    </h1>
  </header>
)

export default Header
