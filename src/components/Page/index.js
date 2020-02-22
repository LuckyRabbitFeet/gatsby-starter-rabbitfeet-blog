import React from 'react'
import PropTypes from 'prop-types'

import PageTitle from './PageTitle'
import Bodytext from '../Article/Bodytext'
import PageFooter from './PageFooter'

const Page = ({
  page: {
    html,
    frontmatter: { title, subtitle, comment },
  },
}) => {
  return (
    <React.Fragment>
      <PageTitle title={title} subtitle={subtitle} />
      <Bodytext html={html} />
      <PageFooter title={title} comment={comment} />
    </React.Fragment>
  )
}

Page.propTypes = {
  page: PropTypes.object.isRequired,
}

export default Page
