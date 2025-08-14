import type { Block } from 'payload'
import { lexicalIconMap } from '@/constants/lexicalIconNode'

export const IconBlock: Block = {
  slug: 'iconBlock',
  interfaceName: 'IconBlock',

  fields: [
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: Object.keys(lexicalIconMap).map((key) => ({
        label: key,
        value: key,
      })),
    },
    {
      name: 'size',
      type: 'select',
      required: true,
      defaultValue: 'base',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Base',
          value: 'base',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Extra Large',
          value: 'extraLarge',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
        {
          label: 'Same as Text',
          value: 'sameAsText',
        },
      ],
    },
    {
      name: 'customSize',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.size === 'custom',
      },
      validate: (value: any, allValues: any) => {
        if (allValues.size === 'custom' && !value) {
          return 'You must provide a custom size' as string
        } else {
          return true
        }
      },
    },
  ],
}
