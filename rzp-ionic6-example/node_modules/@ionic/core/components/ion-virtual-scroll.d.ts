import type { Components, JSX } from "../dist/types/interface";

interface IonVirtualScroll extends Components.IonVirtualScroll, HTMLElement {}
export const IonVirtualScroll: {
  prototype: IonVirtualScroll;
  new (): IonVirtualScroll;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
