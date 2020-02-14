import React from 'react'

import SEO from '../components/SEO'
import Animation404 from '../components/Animation404'

const NotFoundPage = () => (
  <React.Fragment>
    <SEO title="404: Not found" />
    {/* <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p> */}
    <Animation404 />
  </React.Fragment>
)

export default NotFoundPage
