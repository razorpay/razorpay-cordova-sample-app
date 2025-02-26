"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const utility_1 = require("../utility");
const dependencies_1 = require("../utility/dependencies");
const json_file_1 = require("../utility/json-file");
const latest_versions_1 = require("../utility/latest-versions");
const paths_1 = require("../utility/paths");
const workspace_models_1 = require("../utility/workspace-models");
function addScriptsToPackageJson() {
    return (host) => {
        const pkgJson = new json_file_1.JSONFile(host, 'package.json');
        const e2eScriptPath = ['scripts', 'e2e'];
        if (!pkgJson.get(e2eScriptPath)) {
            pkgJson.modify(e2eScriptPath, 'ng e2e', false);
        }
    };
}
function default_1(options) {
    return async (host) => {
        const appProject = options.relatedAppName;
        const workspace = await (0, utility_1.readWorkspace)(host);
        const project = workspace.projects.get(appProject);
        if (!project) {
            throw new schematics_1.SchematicsException(`Project name "${appProject}" doesn't not exist.`);
        }
        const root = (0, core_1.join)((0, core_1.normalize)(project.root), 'e2e');
        project.targets.add({
            name: 'e2e',
            builder: workspace_models_1.Builders.Protractor,
            defaultConfiguration: 'development',
            options: {
                protractorConfig: `${root}/protractor.conf.js`,
            },
            configurations: {
                production: {
                    devServerTarget: `${options.relatedAppName}:serve:production`,
                },
                development: {
                    devServerTarget: `${options.relatedAppName}:serve:development`,
                },
            },
        });
        await (0, utility_1.writeWorkspace)(host, workspace);
        return (0, schematics_1.chain)([
            (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
                (0, schematics_1.applyTemplates)({
                    utils: schematics_1.strings,
                    ...options,
                    relativePathToWorkspaceRoot: (0, paths_1.relativePathToWorkspaceRoot)(root),
                }),
                (0, schematics_1.move)(root),
            ])),
            (host) => [
                {
                    type: dependencies_1.NodeDependencyType.Dev,
                    name: 'protractor',
                    version: '~7.0.0',
                },
                {
                    type: dependencies_1.NodeDependencyType.Dev,
                    name: 'jasmine-spec-reporter',
                    version: '~7.0.0',
                },
                {
                    type: dependencies_1.NodeDependencyType.Dev,
                    name: 'ts-node',
                    version: latest_versions_1.latestVersions['ts-node'],
                },
                {
                    type: dependencies_1.NodeDependencyType.Dev,
                    name: '@types/node',
                    version: latest_versions_1.latestVersions['@types/node'],
                },
            ].forEach((dep) => (0, dependencies_1.addPackageJsonDependency)(host, dep)),
            addScriptsToPackageJson(),
        ]);
    };
}
exports.default = default_1;
