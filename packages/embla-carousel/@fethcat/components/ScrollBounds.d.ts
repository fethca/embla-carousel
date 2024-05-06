import { LimitType } from './Limit.js'
import { PercentOfViewType } from './PercentOfView.js'
import { ScrollBodyType } from './ScrollBody.js'
import { Vector1DType } from './Vector1d.js'
export type ScrollBoundsType = {
  constrain: (pointerDown: boolean) => void
  toggleActive: (active: boolean) => void
}
export declare function ScrollBounds(
  limit: LimitType,
  offsetLocation: Vector1DType,
  target: Vector1DType,
  scrollBody: ScrollBodyType,
  percentOfView: PercentOfViewType
): ScrollBoundsType
