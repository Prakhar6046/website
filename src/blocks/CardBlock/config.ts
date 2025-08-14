import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultLexical } from '@/fields/defaultLexical'

export const CardBlock: Block = {
  slug: 'cardBlock',
  interfaceName: 'CardBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Content Rich Text',
              editor: defaultLexical,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
