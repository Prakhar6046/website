import { Config, getPayload } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { FontColorFeature } from '@/lexical/features/fontColorFeature/feature.server'
import { IconBlock } from '@/blocks/IconBlock/config'
import { OpenImageButtonBlock } from '@/blocks/OpenImageButtonBlock/config'
import { CardBlock } from '@/blocks/CardBlock/config'
import { StructuralDiagramGalleryBlock } from '@/blocks/StructuralDiagramGalleryBlock/config'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: ({ defaultFeatures, rootFeatures }) => {
    return [
      ...defaultFeatures,
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      FontColorFeature(),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      BlocksFeature({
        inlineBlocks: [IconBlock, OpenImageButtonBlock, StructuralDiagramGalleryBlock],
      }),
      AlignFeature(),
      LinkFeature({
        enabledCollections: ['pages', 'posts', 'products'],
        fields: ({ defaultFields, config }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.linkType !== 'internal'
                },
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
              validate: (value: any, options: any) => {
                if (options?.siblingData?.linkType === 'internal') {
                  return true // no validation needed, as no url should exist for internal links
                }
                return value ? true : 'URL is required'
              },
            },
            {
              name: 'appearance',
              type: 'select',
              label: 'Appearance',
              required: true,
              defaultValue: 'link',
              //'link' | 'inline' | 'default' | 'destructive' | 'ghost' | 'outline' | 'secondary'
              options: [
                {
                  label: 'Link',
                  value: 'link',
                },
                {
                  label: 'Inline',
                  value: 'inline',
                },
                {
                  label: 'Default',
                  value: 'default',
                },
                {
                  label: 'Destructive',
                  value: 'destructive',
                },
                {
                  label: 'Ghost',
                  value: 'ghost',
                },
                {
                  label: 'Outline',
                  value: 'outline',
                },
                {
                  label: 'Secondary',
                  value: 'secondary',
                },
              ],
            },
            {
              name: 'modelOfInterestEnable',
              type: 'checkbox',
              label: 'Model of Interest (if navigating to a page with form)',
              defaultValue: false,
            },
            {
              name: 'productSelectField',
              label: 'Model of Interest select',
              type: 'relationship',
              relationTo: 'products',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.modelOfInterestEnable && siblingData.linkType === 'internal'
                },
              },
            },
          ]
        },
      }),
    ]
  },
})
