import {
  EditorConfig,
  LexicalCommand,
  LexicalNode,
  SerializedTextNode,
  TextNode,
  createCommand,
} from '@payloadcms/richtext-lexical/lexical'

import { Spread } from '@payloadcms/richtext-lexical/lexical'

export const APPLY_FONT_COLOR_COMMAND: LexicalCommand<void> = createCommand('APPLY_FONT_COLOR')

export type SerializedFontColorNode = Spread<
  {
    type: 'fontColor'
    version: 1
  },
  SerializedTextNode
>

export class FontColorNode extends TextNode {
  static override getType(): string {
    return 'fontColor'
  }

  static override clone(node: FontColorNode): FontColorNode {
    return new FontColorNode(node.__text, node.__key)
  }

  override canHaveFormat(): boolean {
    return true
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config)
    return element
  }

  override updateDOM(prevNode: FontColorNode, dom: HTMLElement, config: EditorConfig): boolean {
    const update = super.updateDOM(prevNode, dom, config)
    return update
  }

  static override importJSON(serializedNode: SerializedFontColorNode): FontColorNode {
    const node = $createFontColorNode(serializedNode.text)
    node.setFormat(serializedNode.format)
    return node
  }

  override exportJSON(): SerializedFontColorNode {
    return {
      ...super.exportJSON(),
      type: 'fontColor',
      version: 1,
    }
  }
}

export function $createFontColorNode(text: string): FontColorNode {
  return new FontColorNode(text)
}

export function $isFontColorNode(node: LexicalNode | null | undefined): node is FontColorNode {
  return node instanceof FontColorNode
}
