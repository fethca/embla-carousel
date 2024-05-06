import { PointerEventType } from './DragTracker.js'
export type WindowType = Window & typeof globalThis
export declare function isNumber(subject: unknown): subject is number
export declare function isString(subject: unknown): subject is string
export declare function isBoolean(subject: unknown): subject is boolean
export declare function isObject(
  subject: unknown
): subject is Record<string, unknown>
export declare function mathAbs(n: number): number
export declare function mathSign(n: number): number
export declare function deltaAbs(valueB: number, valueA: number): number
export declare function factorAbs(valueB: number, valueA: number): number
export declare function arrayKeys<Type>(array: Type[]): number[]
export declare function arrayLast<Type>(array: Type[]): Type
export declare function arrayLastIndex<Type>(array: Type[]): number
export declare function arrayIsLastIndex<Type>(
  array: Type[],
  index: number
): boolean
export declare function arrayFromNumber(n: number, startAt?: number): number[]
export declare function objectKeys<Type extends object>(object: Type): string[]
export declare function objectsMergeDeep(
  objectA: Record<string, unknown>,
  objectB: Record<string, unknown>
): Record<string, unknown>
export declare function isMouseEvent(
  evt: PointerEventType,
  ownerWindow: WindowType
): evt is MouseEvent
