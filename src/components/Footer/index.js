import React from 'react'
import { FaAngleUp } from 'react-icons/fa'

import { scrollSmoothTo } from '../../utils/scroll'

import styleList from './index.module.less'

const Footer = () => (
  <footer className={styleList.footer}>
    <div className={styleList.container}>
      <p className={styleList.copyright}>
        RabbitFeet © {new Date().getFullYear()}
      </p>
      <p className={styleList.footerItem}>
        Build with{' '}
        <a
          href="https://www.gatsbyjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gatsby
        </a>{' '}
        and{' '}
        <a href="https://reactjs.org" rel="noopener noreferrer" target="_blank">
          React
        </a>
        .
      </p>
      <div className={styleList.button}>
        <div
          onClick={() => {
            scrollSmoothTo(0)
          }}
        >
          <FaAngleUp />
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
