import React from 'react'
import PropTypes from 'prop-types'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'md5'

import config from '../../../config'

class Comment extends React.Component {
  componentDidMount = () => {
    const gitalk = new Gitalk({
      ...config.gitalk,
      id: md5(location.pathname), // Ensure uniqueness and length less than 50
      title: this.props.title || document.title,
      distractionFreeMode: false, // Facebook-like distraction free mode
    })

    gitalk.render('gitalk-container')
  }

  render() {
    return <div id="gitalk-container"></div>
  }
}

Comment.propTypes = {
  title: PropTypes.string,
}

export default Comment
