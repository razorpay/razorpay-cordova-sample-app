import type { Components, JSX } from "../dist/types/interface";

interface IonNav extends Components.IonNav, HTMLElement {}
export const IonNav: {
  prototype: IonNav;
  new (): IonNav;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
