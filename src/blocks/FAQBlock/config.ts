import { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  fields: [
    {
      name: 'faqItems',
      label: 'Questions',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        {
          required: true,
          name: 'heading',
          label: 'Heading',
          type: 'richText',
          editor: defaultLexical,
        },
        {
          required: true,
          name: 'content',
          label: 'Content',
          type: 'richText',
          editor: defaultLexical,
        },
      ],
    },
  ],
}
