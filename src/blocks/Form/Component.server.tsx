'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import React, { Suspense } from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { FormBlock as FormBlockProps } from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'

export type FormBlockType = FormBlockProps & {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlockServer: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  return (
    <Suspense fallback={null}>
      <FormBlock {...props} />
    </Suspense>
  )
}
