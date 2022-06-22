"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspacePath = exports.getWorkspaceLayout = void 0;
const project_configuration_1 = require("../generators/project-configuration");
const json_1 = require("./json");
/**
 * Returns workspace defaults. It includes defaults folders for apps and libs,
 * and the default scope.
 *
 * Example:
 *
 * ```typescript
 * { appsDir: 'apps', libsDir: 'libs', npmScope: 'myorg' }
 * ```
 * @param tree - file system tree
 */
function getWorkspaceLayout(tree) {
    var _a, _b, _c, _d, _e;
    const nxJson = project_configuration_1.readNxJson(tree);
    const rawWorkspace = json_1.readJson(tree, getWorkspacePath(tree));
    return {
        appsDir: (_b = (_a = nxJson === null || nxJson === void 0 ? void 0 : nxJson.workspaceLayout) === null || _a === void 0 ? void 0 : _a.appsDir) !== null && _b !== void 0 ? _b : 'apps',
        libsDir: (_d = (_c = nxJson === null || nxJson === void 0 ? void 0 : nxJson.workspaceLayout) === null || _c === void 0 ? void 0 : _c.libsDir) !== null && _d !== void 0 ? _d : 'libs',
        npmScope: (_e = nxJson === null || nxJson === void 0 ? void 0 : nxJson.npmScope) !== null && _e !== void 0 ? _e : '',
        standaloneAsDefault: Object.values(rawWorkspace.projects).reduce(
        // default for second, third... projects should be based on all projects being defined as a path
        // for configuration read from ng schematics, this is determined by configFilePath's presence
        (allStandalone, next) => allStandalone && (typeof next === 'string' || 'configFilePath' in next), 
        // default for first project should be true if using Nx Schema
        rawWorkspace.version > 1),
    };
}
exports.getWorkspaceLayout = getWorkspaceLayout;
function getWorkspacePath(tree) {
    const possibleFiles = ['/angular.json', '/workspace.json'];
    return possibleFiles.filter((path) => tree.exists(path))[0];
}
exports.getWorkspacePath = getWorkspacePath;
//# sourceMappingURL=get-workspace-layout.js.map