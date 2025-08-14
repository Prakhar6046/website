'use client'

import { useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'

interface Props {
  updateModuleOfInterest: (modelOfInterest: string) => void
}

export const SearchParamsLoader: FC<Props> = ({ updateModuleOfInterest }) => {
  const searchParams = useSearchParams()
  useEffect(() => {
    const modelOfInterest = searchParams.get('modelOfInterest')
    if (modelOfInterest) {
      console.log('modelOfInterest', modelOfInterest)
      updateModuleOfInterest(modelOfInterest)
    }
  }, [])
  return <></>
}
