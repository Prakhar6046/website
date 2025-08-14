import { MediaBlock } from '@/blocks/MediaBlock/Component'
import React from 'react'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  MediaBlock as MediaBlockProps,
  IconBlock as IconBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { cn } from '@/utilities/ui'
import { css2obj } from '@/utilities/css2Obj'
import IconBlock from '@/blocks/IconBlock/Component'
import { CMSLink } from '@/components/Link'
import { FormBlockServer } from '@/blocks/Form/Component.server'
import OpenImageButtonBlock from '@/blocks/OpenImageButtonBlock/Component'
import CardBlock from '@/blocks/CardBlock/Component'
import StructuralDiagramGalleryBlock from '@/blocks/StructuralDiagramGalleryBlock/Component'

const states = {
  IS_BOLD: 1,
  IS_ITALIC: 2,
  IS_STRIKETHROUGH: 4,
  IS_UNDERLINE: 8,
  IS_CODE: 16,
  IS_SUBSCRIPT: 32,
  IS_SUPERSCRIPT: 64,
  IS_HIGHLIGHT: 128,
}

const getFormattingStates = (decimalNumber: number) =>
  Object.fromEntries(Object.entries(states).map(([k, v]) => [k, !!(v & decimalNumber)]))

const getActiveFormattingStates = (decimalNumber: number) =>
  Object.entries(states).reduce(
    (acc, [k, v]) => (v & decimalNumber ? { ...acc, [k]: true } : acc),
    {},
  )

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps | IconBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug

  if (slug === 'contact') {
    //@ts-expect-error we do have productSelectField in some cases, so we ignore this
    const modelOfInterest = linkNode.fields.productSelectField.slug
    return `/contact?modelOfInterest=${modelOfInterest}`
  }

  return relationTo === 'products' ? `/products/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  link: ({ node }) => {
    //@ts-expect-error we do have slug in some cases, so we ignore this
    const slugExists = node.fields.doc?.value?.slug

    const productSelectField = node.fields.productSelectField

    return (
      <CMSLink
        {...node.fields}
        url={slugExists ? internalDocToHref({ linkNode: node }) : node.fields.url}
        appearance={
          node.fields.appearance as
            | 'link'
            | 'inline'
            | 'default'
            | 'destructive'
            | 'ghost'
            | 'outline'
            | 'secondary'
        }
      >
        {node.children.map((child) => {
          //@ts-expect-error we are not using blocks inside <a> tag so we can ignore this
          return defaultConverters[child.type]({ node: child })
        })}
      </CMSLink>
    )
  },
  text: (args) => {
    const { text } = args.node
    const formatStates = getFormattingStates(args.node.format)

    const styleObj = css2obj(args.node.style)

    if (formatStates.IS_BOLD) {
      return (
        <strong style={styleObj} className="font-bold">
          {text}
        </strong>
      )
    } else if (formatStates.IS_ITALIC) {
      return (
        <em style={styleObj} className="italic">
          {text}
        </em>
      )
    } else if (formatStates.IS_UNDERLINE) {
      return (
        <u style={styleObj} className="underline">
          {text}
        </u>
      )
    } else {
      if (defaultConverters.text)
        return (
          <span className={'text-foreground'} style={styleObj}>
            {text}
          </span>
        )
    }
  },
  heading: ({ node, childIndex }) => {
    const { tag, children } = node

    const Tag = `${tag}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

    return (
      <Tag key={`${tag}-${childIndex}`} {...node}>
        {(
          children as Array<SerializedLexicalNode & { text: string; style: string; fields?: any }>
        ).map((child, index) => {
          if (child.type === 'linebreak') {
            return <br key={index} />
          }

          if (child.type === 'inlineBlock' && child.fields.blockType === 'iconBlock') {
            //@ts-expect-error
            return jsxConverters({ defaultConverters: {} })?.inlineBlocks?.iconBlock({
              node: child,
            })
          }

          const style = css2obj(child.style)
          return (
            <span key={index} style={{ ...style }}>
              {child.text}
            </span>
          )
        })}
      </Tag>
    )
  },
  inlineBlocks: {
    //@ts-expect-error
    iconBlock: ({ node }) => {
      return (
        <IconBlock
          blockType={node.fields.blockType}
          icon={node.fields.icon}
          size={node.fields.size}
          customSize={node.fields.customSize}
        />
      )
    },
    //@ts-expect-error
    openImageButtonBlock: ({ node }) => {
      return <OpenImageButtonBlock {...node.fields} />
    },
    //@ts-expect-error
    structuralDiagramGalleryBlock: ({ node }) => {
      return <StructuralDiagramGalleryBlock {...node.fields} />
    },
  },
  blocks: {
    iconBlock: ({ node }) => {
      return (
        <IconBlock
          blockType={node.fields.blockType}
          icon={node.fields.icon}
          size={node.fields.size}
          customSize={node.fields.customSize}
        />
      )
    },
    //@ts-expect-error
    formBlock: ({ node }) => <FormBlockServer {...node.fields} />,
    //@ts-expect-error
    structuralDiagramGalleryBlock: ({ node }) => {
      return <StructuralDiagramGalleryBlock {...node.fields} />
    },
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        {...node.fields}
        className="col-span-3 col-start-1 !h-fit"
        imgClassName="m-0"
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),

    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose mx-auto md:prose-md lg:prose-lg dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
