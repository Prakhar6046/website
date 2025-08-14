import { createNode, createServerFeature } from '@payloadcms/richtext-lexical'
import { FontColorNode } from '@/lexical/features/fontColorFeature/node'

export const FontColorFeature = createServerFeature({
  feature: {
    ClientFeature: {
      path: './lexical/features/fontColorFeature/feature.client',
    },
    nodes: [
      createNode({
        converters: {},
        node: FontColorNode,
      }),
    ],
  },
  key: 'fontColor',
})
