/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/language-service/override_rename_ts_plugin" />
import * as ts from 'typescript/lib/tsserverlibrary';
/**
 * This factory is used to disable the built-in rename provider,
 * see `packages/language-service/README.md#override-rename-ts-plugin` for more info.
 */
declare const factory: ts.server.PluginModuleFactory;
export { factory };
