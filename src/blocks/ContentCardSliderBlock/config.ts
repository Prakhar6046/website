import type { Block } from 'payload'
import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { FontColorFeature } from '@/lexical/features/fontColorFeature/feature.server'
import { IconBlock } from '@/blocks/IconBlock/config'

export const ContentCardSliderBlock: Block = {
  slug: 'contentCardSliderBlock',
  interfaceName: 'ContentCardSliderBlock',
  labels: {
    singular: 'Content Card Slider Block',
    plural: 'Content Card Slider Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'group',
      validate: (_value) => {
        //if not the same length, return an error
        // if (values.contentBlocks.length !== values.mediaBlocks.length) {
        //   return 'Content and media blocks must be the same length'
        // }

        return true
      },
      fields: [
        {
          name: 'contentBlocks',
          type: 'array',
          required: true,
          minRows: 1,
          fields: [
            {
              name: 'contentBlock',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures, defaultFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    FontColorFeature(),
                    BlocksFeature({ inlineBlocks: [IconBlock] }),
                    AlignFeature(),
                    InlineToolbarFeature(),
                    ...defaultFeatures,
                  ]
                },
              }),
            },
          ],
        },
        {
          name: 'mediaBlocks',
          type: 'array',
          required: true,
          minRows: 1,
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
