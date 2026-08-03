import { author } from "./documents/author";
import { category } from "./documents/category";
import { homePage } from "./documents/homePage";
import { post } from "./documents/post";
import { siteSettings } from "./documents/siteSettings";
import { tag } from "./documents/tag";
import { navItem } from "./objects/navItem";
import { portableBody } from "./objects/portableBody";
import { seo } from "./objects/seo";

export const schemaTypes = [
  // documents
  post,
  author,
  category,
  tag,
  siteSettings,
  homePage,
  // objects
  seo,
  navItem,
  portableBody,
];
