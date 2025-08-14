import { Block } from 'payload'

export const CompareBlock: Block = {
  slug: 'compareBlock',
  interfaceName: 'CompareBlock',
  graphQL: {
    singularName: 'CompareBlock',
  },
  labels: {
    plural: 'Compare Blocks',
    singular: 'Compare Block',
  },
  fields: [
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
