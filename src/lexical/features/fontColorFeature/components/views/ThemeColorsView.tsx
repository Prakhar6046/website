import React, { useEffect, useRef, useState } from 'react'

import appTheme from '@/app/(frontend)/css/colors'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createSentenceFromCamelCase } from '../../utils/createSentenceFromCamelCase'
import { translateColor } from '../../utils/translateColor'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ColorSpectrum } from '../ColorPicker'
import { Separator } from '@/components/ui/separator'

type Props = {
  onFontColorChange: (color: string, cssVariableColor: string) => void
  onColorSpectrumChange: (colorSpectrum: ColorSpectrum) => void
  colorSpectrum: ColorSpectrum
}

export const ThemeColorsView = ({
  onFontColorChange,
  onColorSpectrumChange,
  colorSpectrum,
}: Props) => {
  return (
    <div>
      <RadioGroupList value={colorSpectrum} onValueChange={onColorSpectrumChange} />
      <Separator className="my-2" />
      <ScrollArea className="h-[265px] overflow-auto">
        <div className="flex flex-col gap-2">
          {Object.entries(appTheme).map(([key, variable]) => {
            return (
              <ThemeColorButton
                colorSpectrum={colorSpectrum}
                variableName={key}
                key={key}
                onFontColorChange={onFontColorChange}
                variable={variable}
              />
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

type BtnProps = {
  variableName: string
  variable: string
  onFontColorChange: (color: string, cssVariableColor: string) => void
  colorSpectrum: ColorSpectrum
}

const ThemeColorButton = ({
  variableName,
  variable,
  onFontColorChange,
  colorSpectrum,
}: BtnProps) => {
  const colorRef = useRef(null)
  const [backgroundColor, setBackgroundColor] = React.useState<string | undefined>(undefined)

  const getTranslateSpectrum = (
    colorSpectrum: ColorSpectrum,
  ): 'HEX' | 'RGBstring' | 'HSLstring' => {
    switch (colorSpectrum) {
      case 'hex':
        return 'HEX'
      case 'hsl':
        return 'HSLstring'
      case 'rgb':
        return 'RGBstring'
      default:
        return 'HEX'
    }
  }

  useEffect(() => {
    if (colorRef.current) {
      const computedStyle = getComputedStyle(colorRef.current)
      setBackgroundColor(
        translateColor(computedStyle.backgroundColor, getTranslateSpectrum(colorSpectrum), 0),
      )
    }
  }, [colorSpectrum])

  return (
    <button
      key={variableName}
      onClick={() => {
        if (!backgroundColor) return
        onFontColorChange(translateColor(backgroundColor, 'HEX'), `hsl(var(${variable}))`)
      }}
      className="outiline-none flex cursor-pointer items-center gap-2 rounded-md border-none bg-[var(--theme-elevation-0)] p-1 hover:bg-[var(--theme-elevation-50)]"
    >
      <div className="flex w-full items-center gap-2">
        <div
          style={{ backgroundColor: `hsl(var(${variable}))` }}
          ref={colorRef}
          className={`h-9 w-9 rounded-full border-[1px] border-solid border-white`}
        ></div>
        <div className="leading-none">{createSentenceFromCamelCase(variableName, 15)}</div>
      </div>
      <div className="mr-2 whitespace-nowrap rounded-sm bg-[var(--theme-elevation-150)] p-2 leading-none">
        {backgroundColor}
      </div>
    </button>
  )
}

type RadioGroupListProps = {
  value: ColorSpectrum
  onValueChange: (value: ColorSpectrum) => void
}
const RadioGroupList = ({ onValueChange, value }: RadioGroupListProps) => {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      value={value}
      className="flex w-fit rounded-md bg-[var(--theme-elevation-50)] p-2"
    >
      <div className="flex items-center gap-1">
        <RadioGroupItem value="hex" id="hex" />
        <Label htmlFor="hex">HEX</Label>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="hsl" id="hsl" />
        <Label htmlFor="hsl">HSL</Label>
      </div>

      <div className="flex items-center gap-1">
        <RadioGroupItem value="rgb" id="rgb" />
        <Label htmlFor="rgb">RGB</Label>
      </div>
    </RadioGroup>
  )
}
