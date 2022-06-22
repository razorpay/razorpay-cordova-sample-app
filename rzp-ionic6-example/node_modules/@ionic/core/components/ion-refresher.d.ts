import type { Components, JSX } from "../dist/types/interface";

interface IonRefresher extends Components.IonRefresher, HTMLElement {}
export const IonRefresher: {
  prototype: IonRefresher;
  new (): IonRefresher;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
