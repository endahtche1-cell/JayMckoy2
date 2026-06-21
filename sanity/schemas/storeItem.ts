import { defineType, defineField } from 'sanity'

export const storeItem = defineType({
  name: 'storeItem',
  title: 'Store Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'type',
      type: 'string',
      options: { list: ['print', 'original'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'price', type: 'number', description: 'Price in GBP pence (e.g. 4500 = £45.00)' }),
    defineField({ name: 'stripePriceId', type: 'string', description: 'Stripe Price ID (price_xxx)' }),
    defineField({
      name: 'sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Size label (e.g. A3)' },
            { name: 'price', type: 'number', title: 'Price in GBP pence' },
            { name: 'stripePriceId', type: 'string', title: 'Stripe Price ID' },
          ],
        },
      ],
      description: 'Leave empty if single price; populate for per-size pricing',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['available', 'sold-out', 'coming-soon'] },
      initialValue: 'available',
    }),
    defineField({ name: 'medium', type: 'string' }),
    defineField({ name: 'dimensions', type: 'string' }),
    defineField({ name: 'edition', type: 'string', description: 'e.g. Edition of 50' }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'type' },
  },
})
