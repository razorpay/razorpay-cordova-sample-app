import type { Components, JSX } from "../dist/types/interface";

interface IonItemGroup extends Components.IonItemGroup, HTMLElement {}
export const IonItemGroup: {
  prototype: IonItemGroup;
  new (): IonItemGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
