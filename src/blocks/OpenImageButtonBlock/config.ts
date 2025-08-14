import { Block } from 'payload'

export const OpenImageButtonBlock: Block = {
  slug: 'openImageButtonBlock',
  interfaceName: 'OpenImageButtonBlock',
  fields: [
    {
      name: 'buttonLabel',
      label: 'Button Label',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
