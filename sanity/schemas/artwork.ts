import { defineType, defineField } from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['portrait', 'character', 'sketch'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'year', type: 'number' }),
    defineField({ name: 'medium', type: 'string', description: 'e.g. Colored pencil on paper' }),
    defineField({ name: 'dimensions', type: 'string', description: 'e.g. 30 × 40 cm' }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['available', 'sold', 'not-for-sale'] },
      initialValue: 'available',
    }),
    defineField({ name: 'featured', type: 'boolean', description: 'Show on homepage', initialValue: false }),
    defineField({ name: 'order', type: 'number', description: 'Display order within category' }),
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'category' },
  },
})
