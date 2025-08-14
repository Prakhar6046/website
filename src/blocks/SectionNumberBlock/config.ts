import type { Block } from 'payload'

export const SectionNumberBlock: Block = {
  slug: 'sectionNumberBlock',
  interfaceName: 'SectionNumberBlock',
  fields: [
    {
      name: 'Index',
      type: 'number',
      min: 1,
      required: true,
    },
  ],
}
