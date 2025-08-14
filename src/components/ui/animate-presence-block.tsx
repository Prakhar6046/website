'use client'
import { motion } from 'framer-motion'
import { FC, PropsWithChildren } from 'react'

interface Props {
  index?: number
  className?: string
}

export const AnimatePresenceBlock: FC<PropsWithChildren<Props>> = ({
  children,
  index = 1,
  className,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, translateY: 20 }}
      viewport={{ once: true }}
      whileInView={{
        opacity: 1,
        translateY: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
        },
      }}
      // exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
