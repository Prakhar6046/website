import type { Block, Field } from 'payload'
import { link } from '@/fields/link'
import { FormBlock } from '@/blocks/Form/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { ContentCardSliderBlock } from '@/blocks/ContentCardSliderBlock/config'
import { ContentToImageVerticalScrollBlock } from '@/blocks/ContentToImageVerticalScrollBlock/config'
import { ContentWithImageMiddleBlock } from '@/blocks/ContentWithImageMiddleBlock/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { CompareBlock } from '@/blocks/CompareBlock/config'
import colors from '@/app/(frontend)/css/colors'
import { GalleryBlock } from '@/blocks/GalleryBlock/config'
import { defaultLexical } from '@/fields/defaultLexical'
import { ProductArchive } from '@/blocks/ProductArchiveBlock/config'
import { SectionNumberBlock } from '@/blocks/SectionNumberBlock/config'
import { OpenImageButtonBlock } from '@/blocks/OpenImageButtonBlock/config'
import { CardBlock } from '@/blocks/CardBlock/config'
import { ContentStructuralDetailsBlock } from '@/blocks/ContentStructuralDetailsBlock/config'
import { ConfigurationOptionsBlock } from '@/blocks/ConfigurationOptionsBlock/config'
import { StructuralDiagramGalleryBlock } from '@/blocks/StructuralDiagramGalleryBlock/config'

const paddingOptions = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '12',
    value: '12',
  },
  {
    label: '16',
    value: '16',
  },
  {
    label: '20',
    value: '20',
  },
  {
    label: '24',
    value: '24',
  },
]

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'maxWidth',
    type: 'text',
    defaultValue: 'none',
    required: false,
  },
  {
    name: 'center',
    type: 'checkbox',
    defaultValue: false,
    required: false,
  },
  {
    type: 'row',
    fields: [
      {
        name: 'verticalAlignment',
        type: 'select',
        defaultValue: 'top',
        options: [
          {
            label: 'Top',
            value: 'top',
          },
          {
            label: 'Center',
            value: 'center',
          },
          {
            label: 'Bottom',
            value: 'bottom',
          },
        ],
      },
      {
        name: 'topPadding',
        type: 'select',
        defaultValue: 'none',
        options: paddingOptions,
      },
      {
        name: 'bottomPadding',
        type: 'select',
        defaultValue: 'none',
        options: paddingOptions,
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: defaultLexical,
    label: false,
  },
  {
    name: 'blocks',
    type: 'blocks',
    blocks: [
      FormBlock,
      MediaBlock,
      SectionNumberBlock,
      ContentCardSliderBlock,
      ContentToImageVerticalScrollBlock,
      ContentWithImageMiddleBlock,
      FAQBlock,
      CompareBlock,
      GalleryBlock,
      ProductArchive,
      OpenImageButtonBlock,
      CardBlock,
      ContentStructuralDetailsBlock,
      ConfigurationOptionsBlock,
      StructuralDiagramGalleryBlock,
    ],
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      type: 'select',
      name: 'sectionGradient',
      label: 'Section Gradient',
      required: true,
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Top to Bottom',
          value: 'topToBottom',
        },
        {
          label: 'Bottom to Top',
          value: 'bottomToTop',
        },
        {
          label: 'Middle',
          value: 'middle',
        },
        {
          label: 'Radial Circle',
          value: 'radialCircleGreen',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: Object.keys(colors).map((colorKey) => ({
        label: colorKey,
        value: colors[colorKey as keyof typeof colors],
      })),
    },
    {
      name: 'addSpotlight',
      type: 'checkbox',
    },
    {
      name: 'disableGutter',
      type: 'checkbox',
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
