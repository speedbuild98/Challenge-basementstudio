import { defineQuery } from "next-sanity";

export const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
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
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postCardFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postCardFields},
    intro,
    body,
    seo
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);
