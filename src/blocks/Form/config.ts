import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { defaultLexical } from '@/fields/defaultLexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'formVariant',
      type: 'select',
      options: [
        {
          label: 'Variant 1',
          value: 'variant1',
        },
        {
          label: 'Variant 2',
          value: 'variant2',
        },
      ],
    },
    {
      name: 'contactInfos',
      type: 'array',
      admin: {
        condition: (value, values) => {
          return values.formVariant === 'variant2'
        },
      },
      fields: [
        {
          name: 'infoType',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Email',
              value: 'email',
            },
            {
              label: 'Phone',
              value: 'phone',
            },
            {
              label: 'Address',
              value: 'address',
            },
          ],
        },
        {
          name: 'richText',
          type: 'richText',
          editor: defaultLexical,
          required: true,
        },
      ],
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
