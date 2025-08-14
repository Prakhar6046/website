'use client'

import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { DropdownColorPicker } from './components/DropdownColorPicker'
import { FontColorPlugin } from '@/lexical/features/fontColorFeature/plugin'
import { FontColorNode } from '@/lexical/features/fontColorFeature/node'

const FontColorFeatureClient = createClientFeature({
  plugins: [
    {
      Component: FontColorPlugin,
      position: 'normal',
    },
  ],
  nodes: [FontColorNode],
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'fontColor',
          label: 'Color Text',
          Component: DropdownColorPicker,
        },
      ]),
    ],
  },
})

export default FontColorFeatureClient
