import React from 'react'
import PropTypes from 'prop-types'

import PageTitle from './PageTitle'
import Bodytext from '../Article/Bodytext'

const Page = ({
  page: {
    html,
    frontmatter: { title, subtitle },
  },
}) => {
  return (
    <React.Fragment>
      <PageTitle title={title} subtitle={subtitle} />
      <Bodytext html={html} />
    </React.Fragment>
  )
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default Page
