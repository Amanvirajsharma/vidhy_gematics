import type { ImgHTMLAttributes } from 'react'

type ImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

const widths = [640, 960, 1280, 1600, 2000]

/** Unsplash serves any width from the same URL, so we can offer a real srcset. */
export function responsiveSrcSet(src: string) {
  if (!src.includes('images.unsplash.com')) return undefined
  if (!/[?&]w=\d+/.test(src)) return undefined
  return widths.map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ')
}

export function Img({ src, alt, sizes = '100vw', loading = 'lazy', ...rest }: ImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      srcSet={responsiveSrcSet(src)}
      sizes={sizes}
      loading={loading}
      decoding="async"
      {...rest}
    />
  )
}
