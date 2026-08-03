import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "navigation",
      title: "Primary navigation",
      type: "array",
      of: [{ type: "navItem" }],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [{ type: "navItem" }],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
