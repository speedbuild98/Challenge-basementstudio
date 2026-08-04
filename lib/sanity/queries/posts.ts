import { defineQuery } from "next-sanity";

export const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  isFeatured,
  coverImage {
    ...,
    alt
  },
  "authors": authors[]->{
    _id,
    name,
    "slug": slug.current,
    bio,
    avatar
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  "tags": tags[]->{
    _id,
    title,
    "slug": slug.current
  }
`;

export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...48] {
    ${postCardFields}
  }
`);

export const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && references(*[_type=="category" && slug.current == $slug][0]._id)]
    | order(publishedAt desc) [0...48] {
    ${postCardFields}
  }
`);

export const postsByTagQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && references(*[_type=="tag" && slug.current == $slug][0]._id)]
    | order(publishedAt desc) [0...48] {
    ${postCardFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postCardFields},
    intro,
    body,
    seo {
      title,
      description,
      ogImage {
        ...,
        alt
      }
    }
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`);

export const sitemapEntriesQuery = defineQuery(`
{
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    _updatedAt,
    publishedAt
  },
  "categories": *[_type == "category" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  },
  "tags": *[_type == "tag" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
}
`);

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current != $slug && count((categories[]._ref)[@ in $categoryIds]) > 0]
    | order(publishedAt desc) [0...3] {
    ${postCardFields}
  }
`);

export const neighboringPostsQuery = defineQuery(`
{
  "newer": *[_type == "post" && defined(slug.current) && publishedAt > $publishedAt]
    | order(publishedAt asc) [0] { ${postCardFields} },
  "older": *[_type == "post" && defined(slug.current) && publishedAt < $publishedAt]
    | order(publishedAt desc) [0] { ${postCardFields} }
}
`);
