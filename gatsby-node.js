const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const config = require('./config')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    let slug = createFilePath({ node, getNode, trailingSlash: false })
    const fileNode = getNode(node.parent)
    const source = fileNode.sourceInstanceName
    if (source === 'posts') {
      slug = config.navPath('art', slug)
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
    createNodeField({
      node,
      name: `source`,
      value: source,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(
        limit: 1000
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
              source
            }
            frontmatter {
              title
              cat
              tags
            }
          }
        }
      }
    }
  `)

  const blogTemplate = path.resolve('./src/templates/BlogTemplate.js')
  const postTemplate = path.resolve('./src/templates/PostTemplate.js')
  const cateTemplate = path.resolve('./src/templates/CateTemplate.js')
  const tagTemplate = path.resolve('./src/templates/TagTemplate.js')
  const pageTemplate = path.resolve('./src/templates/PageTemplate.js')

  const items = result.data.allMarkdownRemark.edges

  // Create blog post list pages (home page)
  const posts = items.filter(item => item.node.fields.source === 'posts')
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages > 1 ? numPages : 1 }).forEach((_, i) => {
    const rootPath = ''
    createPage({
      path: i === 0 ? '/' : `${rootPath}/${i + 1}`,
      component: blogTemplate,
      context: {
        rootPath,
        seo: {
          title: config.meta.siteTitle,
          description: config.meta.siteDescription,
        },
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // and posts
  const catList = {}
  const tagList = {}
  posts.forEach(({ node }, index) => {
    const slug = node.fields.slug
    const next = index === 0 ? undefined : posts[index - 1].node
    const prev = index === posts.length - 1 ? undefined : posts[index + 1].node
    const source = node.fields.source
    const cat = node.frontmatter.cat

    catList[cat] === undefined
      ? (catList[cat] = 1)
      : (catList[cat] = catList[cat] + 1)

    node.frontmatter.tags.forEach(tag => {
      tagList[tag] === undefined
        ? (tagList[tag] = 1)
        : (tagList[tag] = tagList[tag] + 1)
    })

    createPage({
      path: slug,
      component: postTemplate,
      context: {
        slug,
        prev,
        next,
        source,
      },
    })
  })

  // and category page
  Object.keys(config.category).forEach(item => {
    const name = config.category[item].name
    const numPages = catList[item] ? Math.ceil(catList[item] / postsPerPage) : 1
    Array.from({ length: numPages }).forEach((_, i) => {
      const rootPath = `/category/${item}`
      createPage({
        path: i === 0 ? rootPath : `${rootPath}/${i + 1}`,
        component: cateTemplate,
        context: {
          rootPath,
          seo: { title: name, description: name },
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          cat: item,
        },
      })
    })
  })

  // and tag page
  for (const tag in tagList) {
    const numPages = Math.ceil(tagList[tag] / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      const rootPath = `/tags/${tag}`
      createPage({
        path: i === 0 ? rootPath : `${rootPath}/${i + 1}`,
        component: tagTemplate,
        context: {
          rootPath,
          seo: { title: tag, description: tag },
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          tag,
        },
      })
    })
  }

  // and pages.
  const pages = items.filter(item => item.node.fields.source === 'pages')
  pages.forEach(({ node }) => {
    const slug = node.fields.slug
    const source = node.fields.source

    createPage({
      path: slug,
      component: pageTemplate,
      context: {
        slug,
        source,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      subtitle: String!
      comment: Boolean!
    }
  `
  createTypes(typeDefs)
}
