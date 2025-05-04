/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Rule } from '@angular-devkit/schematics';
/**
 * An enum used to specify the type of a dependency found within a package manifest
 * file (`package.json`).
 */
export declare enum DependencyType {
    Default = "dependencies",
    Dev = "devDependencies",
    Peer = "peerDependencies"
}
/**
 * Adds a package as a dependency to a `package.json`. By default the `package.json` located
 * at the schematic's root will be used. The `manifestPath` option can be used to explicitly specify
 * a `package.json` in different location. The type of the dependency can also be specified instead
 * of the default of the `dependencies` section by using the `type` option for either `devDependencies`
 * or `peerDependencies`.
 *
 * When using this rule, {@link NodePackageInstallTask} does not need to be included directly by
 * a schematic. A package manager install task will be automatically scheduled as needed.
 *
 * @param name The name of the package to add.
 * @param specifier The package specifier for the package to add. Typically a SemVer range.
 * @param options An optional object that can contain the `type` of the dependency
 * and/or a path (`packageJsonPath`) of a manifest file (`package.json`) to modify.
 * @returns A Schematics {@link Rule}
 */
export declare function addDependency(name: string, specifier: string, options?: {
    /**
     * The type of the dependency determines the section of the `package.json` to which the
     * dependency will be added. Defaults to {@link DependencyType.Default} (`dependencies`).
     */
    type?: DependencyType;
    /**
     * The path of the package manifest file (`package.json`) that will be modified.
     * Defaults to `/package.json`.
     */
    packageJsonPath?: string;
}): Rule;
