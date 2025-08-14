import { Block } from 'payload'

export const ContentStructuralDetailsBlock: Block = {
  slug: 'contentStructuralDetailsBlock',
  interfaceName: 'ContentStructuralDetailsBlock',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enabled',
      defaultValue: true,
    },
  ],
}
