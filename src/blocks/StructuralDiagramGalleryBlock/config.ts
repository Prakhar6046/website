import { Block } from 'payload'

export const StructuralDiagramGalleryBlock: Block = {
  slug: 'structuralDiagramGalleryBlock',
  interfaceName: 'StructuralDiagramGalleryBlock',
  fields: [
    {
      type: 'array',
      name: 'images',
      label: 'Images',
      required: true,
      minRows: 1,
      fields: [
        {
          type: 'upload',
          name: 'media',
          relationTo: 'media',
        },
      ],
    },
  ],
}
