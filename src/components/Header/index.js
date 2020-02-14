import React from 'react'
import { Link } from 'gatsby'

import styleList from './index.module.less'

const Header = () => (
  <header className={styleList.header}>
    <h1>
      <Link to="/">兔脚の新大陆🐇</Link>
    </h1>
  </header>
)

export default Header
