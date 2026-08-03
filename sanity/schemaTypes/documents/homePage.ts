import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hero title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "knowledgeTitle",
      title: "Knowledge section title",
      type: "string",
      initialValue: "Knowledge Is Meant to Be Shared",
    }),
    defineField({
      name: "featuredPosts",
      title: "Featured posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
