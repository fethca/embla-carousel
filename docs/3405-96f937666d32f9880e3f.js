"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[3405],{3405:function(n,e,t){t.r(e),e.default="import React from 'react'\nimport { EmblaOptionsType } from 'embla-carousel'\nimport useEmblaCarousel from 'embla-carousel-react'\nimport AutoHeight from 'embla-carousel-auto-height'\nimport {\n  NextButton,\n  PrevButton,\n  usePrevNextButtons\n} from '../EmblaCarouselArrowButtons'\nimport { DotButton, useDotButton } from '../EmblaCarouselDotButton'\n\ntype PropType = {\n  slides: number[]\n  options?: EmblaOptionsType\n}\n\nconst EmblaCarousel: React.FC<PropType> = (props) => {\n  const { slides, options } = props\n  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoHeight()])\n\n  const { selectedIndex, scrollSnaps, onDotButtonClick } =\n    useDotButton(emblaApi)\n\n  const {\n    prevBtnDisabled,\n    nextBtnDisabled,\n    onPrevButtonClick,\n    onNextButtonClick\n  } = usePrevNextButtons(emblaApi)\n\n  return (\n    <div className=\"embla\">\n      <div className=\"embla__viewport\" ref={emblaRef}>\n        <div className=\"embla__container\">\n          {slides.map((index) => (\n            <div className=\"embla__slide\" key={index}>\n              <div className=\"embla__slide__number\">\n                <span>{index + 1}</span>\n              </div>\n            </div>\n          ))}\n        </div>\n      </div>\n\n      <div className=\"embla__controls\">\n        <div className=\"embla__buttons\">\n          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />\n          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />\n        </div>\n\n        <div className=\"embla__dots\">\n          {scrollSnaps.map((_, index) => (\n            <DotButton\n              key={index}\n              onClick={() => onDotButtonClick(index)}\n              className={'embla__dot'.concat(\n                index === selectedIndex ? ' embla__dot--selected' : ''\n              )}\n            />\n          ))}\n        </div>\n      </div>\n    </div>\n  )\n}\n\nexport default EmblaCarousel\n"}}]);
//# sourceMappingURL=3405-96f937666d32f9880e3f.js.map