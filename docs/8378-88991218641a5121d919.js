"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[8378],{8378:function(e,n,s){s.r(n),n.default="import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'\n\nconst TWEEN_FACTOR_BASE = 0.52\nlet tweenFactor = 0\nlet tweenNodes: HTMLElement[] = []\n\nconst numberWithinRange = (number: number, min: number, max: number): number =>\n  Math.min(Math.max(number, min), max)\n\nconst setTweenNodes = (emblaApi: EmblaCarouselType): void => {\n  tweenNodes = emblaApi.slideNodes().map((slideNode) => {\n    return slideNode.querySelector('.embla__slide__number') as HTMLElement\n  })\n}\n\nconst setTweenFactor = (emblaApi: EmblaCarouselType): void => {\n  tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length\n}\n\nconst tweenScale = (\n  emblaApi: EmblaCarouselType,\n  eventName?: EmblaEventType\n): void => {\n  const engine = emblaApi.internalEngine()\n  const scrollProgress = emblaApi.scrollProgress()\n  const slidesInView = emblaApi.slidesInView()\n  const isScrollEvent = eventName === 'scroll'\n\n  emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {\n    let diffToTarget = scrollSnap - scrollProgress\n    const slidesInSnap = engine.slideRegistry[snapIndex]\n\n    slidesInSnap.forEach((slideIndex) => {\n      if (isScrollEvent && !slidesInView.includes(slideIndex)) return\n\n      if (engine.options.loop) {\n        engine.slideLooper.loopPoints.forEach((loopItem) => {\n          const target = loopItem.target()\n\n          if (slideIndex === loopItem.index && target !== 0) {\n            const sign = Math.sign(target)\n\n            if (sign === -1) {\n              diffToTarget = scrollSnap - (1 + scrollProgress)\n            }\n            if (sign === 1) {\n              diffToTarget = scrollSnap + (1 - scrollProgress)\n            }\n          }\n        })\n      }\n\n      const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor)\n      const scale = numberWithinRange(tweenValue, 0, 1).toString()\n      const tweenNode = tweenNodes[slideIndex]\n      tweenNode.style.transform = `scale(${scale})`\n    })\n  })\n}\n\nexport const setupTweenScale = (emblaApi: EmblaCarouselType): (() => void) => {\n  setTweenNodes(emblaApi)\n  setTweenFactor(emblaApi)\n  tweenScale(emblaApi)\n\n  emblaApi\n    .on('reInit', setTweenNodes)\n    .on('reInit', setTweenFactor)\n    .on('reInit', tweenScale)\n    .on('scroll', tweenScale)\n\n  return (): void => {\n    tweenNodes.forEach((slide) => slide.removeAttribute('style'))\n    emblaApi\n      .off('reInit', setTweenNodes)\n      .off('reInit', setTweenFactor)\n      .off('reInit', tweenScale)\n      .off('scroll', tweenScale)\n  }\n}\n"}}]);
//# sourceMappingURL=8378-88991218641a5121d919.js.map