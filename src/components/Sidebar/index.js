import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FaAngleRight } from 'react-icons/fa'

import styleList from './index.module.less'

import config from '../../../config'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.showMenu === this.state.showMenu) {
      return false
    }
    return true
  }

  handleCilck = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    })
  }

  handleClose = () => {
    this.setState({
      showMenu: false,
    })
  }

  render() {
    const { tags } = this.props
    const { showMenu } = this.state

    return (
      <React.Fragment>
        <aside
          className={`${styleList.sidebar}${
            showMenu ? ` ${styleList.active}` : ''
          }`}
        >
          <div className={styleList.container}>
            <div>
              <h2>页面</h2>
              <nav>
                <ul>
                  {config.navigation.map(item => (
                    <li key={item.name} onClick={this.handleClose}>
                      <Link to={config.navPath('/', item.path)}>
                        <FaAngleRight />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <h2>分类</h2>
              <nav>
                <ul>
                  {Object.keys(config.category).map(item => (
                    <li key={item} onClick={this.handleClose}>
                      <Link to={config.navPath('cat', item)}>
                        <FaAngleRight />
                        {config.category[item].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <h2>标签</h2>
              <nav>
                <ul>
                  {tags.map(item => (
                    <li key={item.tag} onClick={this.handleClose}>
                      <Link to={config.navPath('tag', item.tag)}>
                        <FaAngleRight />
                        {`${item.tag} (${item.totalCount})`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </aside>

        <div onClick={this.handleCilck} className={styleList.button}>
          <div className={styleList.gridButton}>
            <span
              className={`${styleList.grid} ${
                showMenu ? styleList.close : styleList.open
              }`}
            ></span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Sidebar.propTypes = {
  tags: PropTypes.array.isRequired,
}

export default Sidebar
