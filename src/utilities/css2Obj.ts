export const css2obj = (css: any) => {
  try {
    const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
      o = {}
    // @ts-expect-error
    css.replace(r, (m: any, p: any, v: any) => (o[p] = v as any))
    return o
  } catch (e) {
    return {}
  }
}
