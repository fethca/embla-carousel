import { AnimationsType } from './Animations.js'
import { AxisType } from './Axis.js'
import { CounterType } from './Counter.js'
import { DragHandlerType } from './DragHandler.js'
import { EventHandlerType } from './EventHandler.js'
import { EventStoreType } from './EventStore.js'
import { LimitType } from './Limit.js'
import { NodeRectType } from './NodeRects.js'
import { OptionsType } from './Options.js'
import { PercentOfViewType } from './PercentOfView.js'
import { ResizeHandlerType } from './ResizeHandler.js'
import { ScrollBodyType } from './ScrollBody.js'
import { ScrollBoundsType } from './ScrollBounds.js'
import { ScrollLooperType } from './ScrollLooper.js'
import { ScrollProgressType } from './ScrollProgress.js'
import { ScrollTargetType } from './ScrollTarget.js'
import { ScrollToType } from './ScrollTo.js'
import { SlideFocusType } from './SlideFocus.js'
import { SlideLooperType } from './SlideLooper.js'
import { SlideRegistryType } from './SlideRegistry.js'
import { SlidesHandlerType } from './SlidesHandler.js'
import { SlidesInViewType } from './SlidesInView.js'
import { SlidesToScrollType } from './SlidesToScroll.js'
import { TranslateType } from './Translate.js'
import { Vector1DType } from './Vector1d.js'
import { WindowType } from './utils.js'
export type EngineType = {
  ownerDocument: Document
  ownerWindow: WindowType
  eventHandler: EventHandlerType
  axis: AxisType
  animation: AnimationsType
  scrollBounds: ScrollBoundsType
  scrollLooper: ScrollLooperType
  scrollProgress: ScrollProgressType
  index: CounterType
  indexPrevious: CounterType
  limit: LimitType
  location: Vector1DType
  offsetLocation: Vector1DType
  options: OptionsType
  percentOfView: PercentOfViewType
  scrollBody: ScrollBodyType
  dragHandler: DragHandlerType
  eventStore: EventStoreType
  slideLooper: SlideLooperType
  slidesInView: SlidesInViewType
  slidesToScroll: SlidesToScrollType
  target: Vector1DType
  translate: TranslateType
  resizeHandler: ResizeHandlerType
  slidesHandler: SlidesHandlerType
  scrollTo: ScrollToType
  scrollTarget: ScrollTargetType
  scrollSnapList: number[]
  scrollSnaps: number[]
  slideIndexes: number[]
  slideFocus: SlideFocusType
  slideRegistry: SlideRegistryType['slideRegistry']
  containerRect: NodeRectType
  slideRects: NodeRectType[]
}
export declare function Engine(
  root: HTMLElement,
  container: HTMLElement,
  slides: HTMLElement[],
  ownerDocument: Document,
  ownerWindow: WindowType,
  options: OptionsType,
  eventHandler: EventHandlerType
): EngineType
