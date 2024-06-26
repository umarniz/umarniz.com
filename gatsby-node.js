const path = require('path')

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPage = path.resolve('./src/templates/post.js')
  const pagePage = path.resolve('./src/templates/page.js')
  const tagPage = path.resolve('./src/templates/tag.js')
  const categoryPage = path.resolve('./src/templates/category.js')
  const journalPage = path.resolve('./src/templates/journal.js')

  const result = await graphql(
    `
      {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                categories
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const all = result.data.allMdx.edges
  const posts = all.filter((post) => post.node.frontmatter.template === 'post')
  const pages = all.filter((page) => page.node.frontmatter.template === 'page')
  const journals = all.filter((journal) => journal.node.frontmatter.template === 'journal')
  const tagSet = new Set()
  const categorySet = new Set()

  // =====================================================================================
  // Posts
  // =====================================================================================

  posts.forEach((post, i) => {
    const previous = i === posts.length - 1 ? null : posts[i + 1].node
    const next = i === 0 ? null : posts[i - 1].node

    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    if (post.node.frontmatter.categories) {
      post.node.frontmatter.categories.forEach((category) => {
        categorySet.add(category)
      })
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // =====================================================================================
  // Pages
  // =====================================================================================

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: pagePage,
      context: {
        slug: page.node.fields.slug,
      },
    })
  })

  // =====================================================================================
  // Journals
  // =====================================================================================

  journals.forEach((journal, i) => {
    const previous = i === journals.length - 1 ? null : journals[i + 1].node
    const next = i === 0 ? null : journals[i - 1].node

    createPage({
      path: journal.node.fields.slug,
      component: journalPage,
      context: {
        slug: journal.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // =====================================================================================
  // Tags
  // =====================================================================================

  const tagList = Array.from(tagSet)
  tagList.forEach((tag) => {
    createPage({
      path: `/tags/${slugify(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })

  // =====================================================================================
  // Categories
  // =====================================================================================

  const categoryList = Array.from(categorySet)
  categoryList.forEach((category) => {
    createPage({
      path: `/categories/${slugify(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
}

const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // =====================================================================================
  // Slugs
  // =====================================================================================

  let slug
  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent)
    const folderPath = path.dirname(fileNode.relativePath)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      slug = `/${node.frontmatter.slug}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    // Creates directoryName field in the node
    createNodeField({
      node,
      name: "folderPath",
      value: folderPath,
    })

    // Creates slug field in the node
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  } 
}

exports.createResolvers = ({ createResolvers }) => {
  // This resolver automatically adds an 'images' field which contains GatsbyImages inside it from the same folder as the post
  createResolvers({
    Mdx: {
      images: {
        type: ["File"],
        resolve(source, args, context, info) {
          const { folderPath } = source.fields

          return context.nodeModel.runQuery({
            query: {
              filter: {
                relativeDirectory: { eq: folderPath },
                extension: {
                  in: ["jpg", "jpeg", "png"],
                },
              }
            },
            type: "File",
            firstOnly: false
          })
        }
      }
    }
  })
}

exports.createPages = createPages
exports.onCreateNode = createNode

// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}
