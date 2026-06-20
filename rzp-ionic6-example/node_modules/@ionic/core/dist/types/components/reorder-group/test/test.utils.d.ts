import type * as pd from '@stencil/core/testing';
/**
 * Moves a reorder item by simulating a drag event
 */
export declare const moveReorderItem: (id: string, page: pd.E2EPage, direction?: 'up' | 'down', numberOfSpaces?: number, ...parentSelectors: string[]) => Promise<void>;
