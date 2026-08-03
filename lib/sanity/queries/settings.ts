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
    featuredPosts[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage { ..., alt },
      "categories": categories[]->{ title, "slug": slug.current }
    }
  }
`);
