import type { Components, JSX } from "../dist/types/interface";

interface IonItemSliding extends Components.IonItemSliding, HTMLElement {}
export const IonItemSliding: {
  prototype: IonItemSliding;
  new (): IonItemSliding;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
