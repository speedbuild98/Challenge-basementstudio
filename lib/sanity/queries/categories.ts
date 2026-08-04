import { defineQuery } from "next-sanity";

export const categoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description
  }
`);

export const tagBySlugQuery = defineQuery(`
  *[_type == "tag" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current
  }
`);

export const tagsQuery = defineQuery(`
  *[_type == "tag" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);
