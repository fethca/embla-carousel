import { EventStoreType } from './EventStore.js';
import { ScrollBodyType } from './ScrollBody.js';
import { ScrollToType } from './ScrollTo.js';
import { SlideRegistryType } from './SlideRegistry.js';
export type SlideFocusType = {
    init: () => void;
};
export declare function SlideFocus(root: HTMLElement, slides: HTMLElement[], slideRegistry: SlideRegistryType['slideRegistry'], scrollTo: ScrollToType, scrollBody: ScrollBodyType, eventStore: EventStoreType): SlideFocusType;
