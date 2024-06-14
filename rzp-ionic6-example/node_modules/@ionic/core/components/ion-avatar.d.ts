import type { Components, JSX } from "../dist/types/interface";

interface IonAvatar extends Components.IonAvatar, HTMLElement {}
export const IonAvatar: {
  prototype: IonAvatar;
  new (): IonAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
