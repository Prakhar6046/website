import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isParallax',
          type: 'checkbox',
          label: 'Enable Parallax',
        },
        {
          name: 'isExpandable',
          type: 'checkbox',
          label: 'Enable Expand',
        },
      ],
    },
  ],
}
