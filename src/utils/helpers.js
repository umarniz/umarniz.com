export function getSimplifiedPosts(posts, options = {}) {
  return posts.map((post) => ({
    id: post.node.id,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    folderPath: post.node.fields.folderPath,
    tags: post.node.frontmatter.tags,
    categories: post.node.frontmatter.categories,
    title: post.node.frontmatter.title,
    description: post.node.frontmatter.description,
    series: post.node.frontmatter.series,
    distanceFromLastLocationInKM: post.node.frontmatter.distanceFromLastLocationInKM,
    cardImage: post.node.frontmatter.cardImage,
    event: post.node.frontmatter.event,
    location: post.node.frontmatter.location,
    summary: post.node.frontmatter.summary,
    images: post.node.images,
  }))
}

export function slugify(string) {
  return (
    string &&
    string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}
