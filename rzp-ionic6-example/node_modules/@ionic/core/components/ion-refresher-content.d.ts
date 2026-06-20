import type { Components, JSX } from "../dist/types/interface";

interface IonRefresherContent extends Components.IonRefresherContent, HTMLElement {}
export const IonRefresherContent: {
  prototype: IonRefresherContent;
  new (): IonRefresherContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
