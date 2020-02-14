import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import config from '../../../config'

const SEO = ({ lang, title, description, meta, url }) => {
  const metaDescription = description || config.meta.siteDescription

  let titleTemplate = `%s | ${config.meta.siteTitle}`
  if (title === config.meta.siteTitle) {
    titleTemplate = null
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // General tags
      title={title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        // OpenGraph tags
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: ``,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        // Twitter Card tags
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: config.meta.authorName,
        },
        {
          name: `twitter:site`,
          content: `@${config.meta.twitterName}`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: ``,
        },
        // QQ Sharing
        {
          itemprop: 'name',
          content: title,
        },
        {
          itemprop: 'image',
          content: ``,
        },
        {
          name: 'description',
          itemprop: 'description',
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script>
        {`
        var WECHAT_TITLE = "${title}"; 
        var WECHAT_DESC = "${metaDescription}";
        var WECHAT_IMAGE = ''; 
        var WCHAT_NO_GA = '';
        `}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: config.meta.siteLanguage,
  meta: [],
  description: ``,
  url: ``,
}

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  url: PropTypes.string,
}

export default SEO
