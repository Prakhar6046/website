'use client'
import dynamic from 'next/dynamic'

const PixelTracker = dynamic(() => import('./PixelTracker'), { ssr: false })

const PixelTrackerWrapper = () => {
  return <PixelTracker />
}
export default PixelTrackerWrapper
