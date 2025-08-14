import { $getSelection, $isRangeSelection, $isTextNode } from '@payloadcms/richtext-lexical/lexical'
import { useEffect } from 'react'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { APPLY_FONT_COLOR_COMMAND } from '@/lexical/features/fontColorFeature/node'
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection'
import { $addNodeStyle } from '@payloadcms/richtext-lexical/lexical/selection'

export const FontColorPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.registerCommand(
      APPLY_FONT_COLOR_COMMAND,
      (styles: any) => {
        editor.update(() => {
          const selection = $getSelection()

          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, styles)
            const nodes = selection.extract()

            nodes.forEach((node) => {
              if ($isTextNode(node)) {
                $addNodeStyle(node)
              }
            })
          }
        })

        return true
      },
      0,
    )
  }, [editor])

  return null
}
