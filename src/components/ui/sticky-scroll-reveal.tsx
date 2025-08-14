'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { Media } from '@/components/Media'

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    richText: SerializedEditorState<SerializedLexicalNode>
    image?: React.ReactNode | any
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = useState(0)

  // Store opacity values for each content block
  const [opacities, setOpacities] = useState<number[]>(() => content.map(() => 1))

  // Ref for the parent scrollable container
  const parentRef = useRef<HTMLDivElement | null>(null)

  // Refs for each content block
  const blocksRef = useRef<Array<HTMLDivElement | null>>([])

  // Setup framer-motion scroll
  const { scrollYProgress } = useScroll({
    container: parentRef,
    offset: ['start start', 'end start'],
  })

  // Watch scroll progress to set "activeCard" (same logic you had)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardLength = content.length
    const cardsBreakpoints = content.map((_, index) => (index * 0.45) / cardLength)
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint)
      if (distance < Math.abs(latest - cardsBreakpoints[acc]!)) {
        return index
      }
      return acc
    }, 0)
    setActiveCard(closestBreakpointIndex)
  })

  // Handler to calculate opacity of each block on scroll
  const handleScroll = () => {
    if (!parentRef.current) return

    const parentRect = parentRef.current.getBoundingClientRect()
    const parentHeight = parentRect.height

    // Calculate new opacities
    const newOpacities = blocksRef.current.map((blockEl) => {
      if (!blockEl) return 1 // fallback if ref is null

      const blockRect = blockEl.getBoundingClientRect()

      // Distance from block to top edge of parent
      const distanceToTop = blockRect.top - parentRect.top
      // Distance from block to bottom edge of parent
      const distanceToBottom = parentRect.bottom - blockRect.bottom

      // Get the closest edge
      const distanceToClosestEdge = Math.min(distanceToTop, distanceToBottom)

      // We want max opacity = 1 at top/bottom edges and min opacity = 0 near center.
      // "distanceToClosestEdge" is 0 if block is aligned at top/bottom.
      // parentHeight / 2 is roughly the midpoint. You can tweak the “scaling” as needed.
      const maxDistance = parentHeight / 2
      let opacity = distanceToClosestEdge / maxDistance

      // Clamp the value between 0 and 1
      if (opacity < 0) opacity = 0
      if (opacity > 1) opacity = 1

      return opacity
    })

    setOpacities(newOpacities)
  }

  // Attach a scroll listener to the parent container
  useEffect(() => {
    const scrollElement = parentRef.current
    if (!scrollElement) return

    scrollElement.addEventListener('scroll', handleScroll, { passive: true })
    // Fire once on mount to set initial opacities
    handleScroll()

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  return (
    <motion.div
      className="relative mt-20 hidden h-[30rem] justify-stretch space-x-10 overflow-y-auto rounded-md [scrollbar-width:none] md:flex md:h-[50rem]"
      ref={parentRef}
    >
      <div className="div relative flex items-start">
        <div className="relative">
          {/* extra spacing at top */}
          <div className="h-20 md:h-72" />
          {content.map((item, index) => (
            <div
              key={index}
              className={cn('my-6')}
              //@ts-expect-error
              ref={(el) => (blocksRef.current[index] = el)}
              style={{ opacity: opacities[index] }}
            >
              <RichText data={item.richText} />
            </div>
          ))}
          {/* extra spacing at bottom */}
          <div className="h-20 md:h-80" />
        </div>
      </div>
      <div
        className={cn(
          'sticky top-0 hidden h-full w-[900px] overflow-hidden rounded-md lg:block',
          contentClassName,
        )}
      >
        <Media
          resource={content[activeCard]?.image?.media}
          className="h-full w-full"
          imgClassName="object-cover w-full h-full"
        />
      </div>
    </motion.div>
  )
}
