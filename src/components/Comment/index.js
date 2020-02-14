import React from 'react'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'md5'

import config from '../../../config'

class Comment extends React.Component {
  componentDidMount = () => {
    const gitalk = new Gitalk({
      clientID: config.gitalk.clientID,
      clientSecret: config.gitalk.clientSecret,
      repo: config.gitalk.repo,
      owner: config.gitalk.owner,
      admin: config.gitalk.admin,
      id: md5(location.pathname), // Ensure uniqueness and length less than 50
      distractionFreeMode: false, // Facebook-like distraction free mode
    })

    gitalk.render('gitalk-container')
  }

  render() {
    return <div id="gitalk-container"></div>
  }
}

export default Comment
