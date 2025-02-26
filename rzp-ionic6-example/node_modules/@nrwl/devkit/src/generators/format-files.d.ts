import type { Tree } from '@nrwl/tao/src/shared/tree';
/**
 * Formats all the created or updated files using Prettier
 * @param tree - the file system tree
 */
export declare function formatFiles(tree: Tree): Promise<void>;
