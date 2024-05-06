import {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
type EmblaViewportRefType = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null
) => void
export type UseEmblaCarouselType = [
  EmblaViewportRefType,
  EmblaCarouselType | undefined
]
declare function useEmblaCarousel(
  options?: EmblaOptionsType,
  plugins?: EmblaPluginType[]
): UseEmblaCarouselType
declare namespace useEmblaCarousel {
  var globalOptions
}
export default useEmblaCarousel
