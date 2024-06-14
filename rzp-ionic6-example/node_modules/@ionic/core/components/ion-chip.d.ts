import type { Components, JSX } from "../dist/types/interface";

interface IonChip extends Components.IonChip, HTMLElement {}
export const IonChip: {
  prototype: IonChip;
  new (): IonChip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
