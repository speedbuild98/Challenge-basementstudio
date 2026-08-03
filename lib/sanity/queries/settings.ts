import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    title,
    description,
    navigation[] {
      label,
      href
    },
    footer {
      text,
      links[] {
        label,
        href
      }
    },
    seo
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    title,
    eyebrow,
    intro,
    knowledgeTitle,
    featuredPosts[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      isFeatured,
      coverImage { ..., alt },
      "categories": categories[]->{ _id, title, "slug": slug.current }
    }
  }
`);
