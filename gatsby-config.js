const config = require('./config')

module.exports = {
  siteMetadata: {
    title: config.meta.siteTitle,
    description: config.meta.siteDescription,
    author: config.meta.authorName,
    siteUrl: config.meta.siteUrl,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      options: {
        postCssPlugins: [require('autoprefixer')()],
      },
    },
    `gatsby-plugin-postcss`,
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-breaks', // from plugins folder
          'gatsby-remark-autolink-headers',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 2em;`,
            },
          },
          `gatsby-remark-smartypants`, // 将标点符号转换为智能标点符号，有助于排版（大概
          `gatsby-remark-external-links`, // 选用此插件后 gatsby-plugin-catch-links 将会失效
          // 'gatsby-remark-highlight', // from plugins folder
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // 这将在代码旁边全局切换行号的显示。
              // 要使用它，请在导入棱镜配色方案后立即在gatsby-browser.js中添加以下行：
              // require（“ prismjs / plugins / line-numbers / prism-line-numbers.css”）默认为false。
              // 如果只希望在某些代码块上显示行号，
              // 请保留false并使用下面的{numberLines：true}语法
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.meta.manifestName,
        short_name: config.meta.manifestShortName,
        start_url: config.meta.manifestStartUrl,
        background_color: config.meta.manifestBackgroundColor,
        theme_color: config.meta.manifestThemeColor,
        display: config.meta.manifestDisplay,
        icon: 'favicon/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: config.meta.trackingId,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/`),
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        include: /svg/,
      },
    },
    {
      resolve: `gatsby-plugin-minify-classnames`,
      options: {
        develop: false, // Enable on `gatsby develop`
      },
    },
    `gatsby-plugin-nprogress`,
    // `gatsby-plugin-catch-links`, // 与插件 gatsby-remark-external-links 会产生冲突，2选1使用
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
}
