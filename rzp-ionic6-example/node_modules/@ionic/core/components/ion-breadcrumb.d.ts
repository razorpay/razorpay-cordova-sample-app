import type { Components, JSX } from "../dist/types/interface";

interface IonBreadcrumb extends Components.IonBreadcrumb, HTMLElement {}
export const IonBreadcrumb: {
  prototype: IonBreadcrumb;
  new (): IonBreadcrumb;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
