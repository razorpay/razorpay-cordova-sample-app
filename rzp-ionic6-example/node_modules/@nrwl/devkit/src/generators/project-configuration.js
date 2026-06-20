"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWorkspace = exports.isStandaloneProject = exports.readNxJson = exports.readProjectConfiguration = exports.updateWorkspaceConfiguration = exports.readWorkspaceConfiguration = exports.getProjects = exports.removeProjectConfiguration = exports.updateProjectConfiguration = exports.addProjectConfiguration = void 0;
const workspace_1 = require("@nrwl/tao/src/shared/workspace");
const get_workspace_layout_1 = require("../utils/get-workspace-layout");
const json_1 = require("../utils/json");
const path_1 = require("../utils/path");
/**
 * Adds project configuration to the Nx workspace.
 *
 * The project configuration is stored in workspace.json or the associated project.json file.
 * The utility will update either files.
 *
 * @param tree - the file system tree
 * @param projectName - unique name. Often directories are part of the name (e.g., mydir-mylib)
 * @param projectConfiguration - project configuration
 * @param standalone - should the project use package.json? If false, the project config is inside workspace.json
 */
function addProjectConfiguration(tree, projectName, projectConfiguration, standalone) {
    const workspaceLayout = get_workspace_layout_1.getWorkspaceLayout(tree);
    standalone = standalone !== null && standalone !== void 0 ? standalone : workspaceLayout.standaloneAsDefault;
    setProjectConfiguration(tree, projectName, projectConfiguration, 'create', standalone);
}
exports.addProjectConfiguration = addProjectConfiguration;
/**
 * Updates the configuration of an existing project.
 *
 * The project configuration is stored in workspace.json or the associated project.json file.
 * The utility will update either files.
 *
 * @param tree - the file system tree
 * @param projectName - unique name. Often directories are part of the name (e.g., mydir-mylib)
 * @param projectConfiguration - project configuration
 */
function updateProjectConfiguration(tree, projectName, projectConfiguration) {
    setProjectConfiguration(tree, projectName, projectConfiguration, 'update');
}
exports.updateProjectConfiguration = updateProjectConfiguration;
/**
 * Removes the configuration of an existing project.
 *
 * The project configuration is stored in workspace.json or the associated project.json file.
 * The utility will update either file.
 */
function removeProjectConfiguration(tree, projectName) {
    setProjectConfiguration(tree, projectName, undefined, 'delete');
}
exports.removeProjectConfiguration = removeProjectConfiguration;
/**
 * Get a map of all projects in a workspace.
 *
 * Use {@link readProjectConfiguration} if only one project is needed.
 */
function getProjects(tree) {
    const workspace = readWorkspace(tree);
    return new Map(Object.keys(workspace.projects || {}).map((projectName) => {
        return [projectName, getProjectConfiguration(projectName, workspace)];
    }));
}
exports.getProjects = getProjects;
/**
 * Read general workspace configuration such as the default project or cli settings
 *
 * This does _not_ provide projects configuration, use {@link readProjectConfiguration} instead.
 */
function readWorkspaceConfiguration(tree) {
    const workspace = readRawWorkspaceJson(tree);
    delete workspace.projects;
    let nxJson = readNxJson(tree);
    if (nxJson === null) {
        return workspace;
    }
    const nxJsonExtends = readNxJsonExtends(tree, nxJson);
    if (nxJsonExtends) {
        nxJson = Object.assign(Object.assign({}, nxJsonExtends), nxJson);
    }
    return Object.assign(Object.assign({}, workspace), nxJson);
}
exports.readWorkspaceConfiguration = readWorkspaceConfiguration;
/**
 * Update general workspace configuration such as the default project or cli settings.
 *
 * This does _not_ update projects configuration, use {@link updateProjectConfiguration} or {@link addProjectConfiguration} instead.
 */
function updateWorkspaceConfiguration(tree, workspaceConfig) {
    const { 
    // Workspace Json Properties
    version, 
    // Nx Json Properties
    cli, defaultProject, generators, implicitDependencies, plugins, npmScope, targetDependencies, workspaceLayout, tasksRunnerOptions, affected, } = workspaceConfig;
    const workspace = {
        version,
    };
    const nxJson = {
        implicitDependencies,
        plugins,
        npmScope,
        targetDependencies,
        workspaceLayout,
        tasksRunnerOptions,
        affected,
        cli,
        generators,
        defaultProject,
    };
    json_1.updateJson(tree, get_workspace_layout_1.getWorkspacePath(tree), (json) => {
        var _a;
        return Object.assign(Object.assign({}, json), ((_a = workspace_1.reformattedWorkspaceJsonOrNull(workspace)) !== null && _a !== void 0 ? _a : workspace));
    });
    if (tree.exists('nx.json')) {
        json_1.updateJson(tree, 'nx.json', (json) => {
            const nxJsonExtends = readNxJsonExtends(tree, json);
            if (nxJsonExtends) {
                const changedPropsOfNxJson = {};
                Object.keys(nxJson).forEach((prop) => {
                    if (JSON.stringify(nxJson[prop], null, 2) !=
                        JSON.stringify(nxJsonExtends[prop], null, 2)) {
                        changedPropsOfNxJson[prop] = nxJson[prop];
                    }
                });
                return Object.assign(Object.assign({}, json), changedPropsOfNxJson);
            }
            else {
                return Object.assign(Object.assign({}, json), nxJson);
            }
        });
    }
}
exports.updateWorkspaceConfiguration = updateWorkspaceConfiguration;
function readNxJsonExtends(tree, nxJson) {
    if (nxJson.extends) {
        const extendsPath = nxJson.extends;
        try {
            return JSON.parse(tree.read(path_1.joinPathFragments('node_modules', extendsPath), 'utf-8'));
        }
        catch (e) {
            throw new Error(`Unable to resolve nx.json extends. Error: ${e.message}`);
        }
    }
    else {
        return null;
    }
}
/**
 * Reads a project configuration.
 *
 * The project configuration is stored in workspace.json or the associated project.json file.
 * The utility will read from either file.
 *
 * @param tree - the file system tree
 * @param projectName - unique name. Often directories are part of the name (e.g., mydir-mylib)
 * @throws If supplied projectName cannot be found
 */
function readProjectConfiguration(tree, projectName) {
    const workspace = readWorkspace(tree);
    if (!workspace.projects[projectName]) {
        throw new Error(`Cannot find configuration for '${projectName}' in ${get_workspace_layout_1.getWorkspacePath(tree)}.`);
    }
    const nxJson = readNxJson(tree);
    return getProjectConfiguration(projectName, workspace);
}
exports.readProjectConfiguration = readProjectConfiguration;
function readNxJson(tree) {
    if (!tree.exists('nx.json')) {
        return null;
    }
    let nxJson = json_1.readJson(tree, 'nx.json');
    const nxJsonExtends = readNxJsonExtends(tree, nxJson);
    if (nxJsonExtends) {
        nxJson = Object.assign(Object.assign({}, nxJsonExtends), nxJson);
    }
    return nxJson;
}
exports.readNxJson = readNxJson;
/**
 * Returns if a project has a standalone configuration (project.json).
 *
 * @param tree - the file system tree
 * @param project - the project name
 */
function isStandaloneProject(tree, project) {
    var _a;
    const rawWorkspace = json_1.readJson(tree, get_workspace_layout_1.getWorkspacePath(tree));
    const projectConfig = (_a = rawWorkspace.projects) === null || _a === void 0 ? void 0 : _a[project];
    return typeof projectConfig === 'string';
}
exports.isStandaloneProject = isStandaloneProject;
function getProjectConfiguration(projectName, workspace) {
    return Object.assign({}, readWorkspaceSection(workspace, projectName));
}
function readWorkspaceSection(workspace, projectName) {
    return workspace.projects[projectName];
}
function setProjectConfiguration(tree, projectName, projectConfiguration, mode, standalone = false) {
    if (mode === 'delete') {
        addProjectToWorkspaceJson(tree, projectName, undefined, mode);
        return;
    }
    if (!projectConfiguration) {
        throw new Error(`Cannot ${mode} "${projectName}" with value ${projectConfiguration}`);
    }
    addProjectToWorkspaceJson(tree, projectName, projectConfiguration, mode, standalone);
}
function addProjectToWorkspaceJson(tree, projectName, project, mode, standalone = false) {
    var _a;
    const path = get_workspace_layout_1.getWorkspacePath(tree);
    const workspaceJson = json_1.readJson(tree, path);
    validateWorkspaceJsonOperations(mode, workspaceJson, projectName);
    const configFile = mode === 'create' && standalone
        ? path_1.joinPathFragments(project.root, 'project.json')
        : getProjectFileLocation(tree, projectName);
    if (configFile) {
        if (mode === 'delete') {
            tree.delete(configFile);
            delete workspaceJson.projects[projectName];
        }
        else {
            json_1.writeJson(tree, configFile, project);
        }
        if (mode === 'create') {
            workspaceJson.projects[projectName] = project.root;
        }
    }
    else if (mode === 'delete') {
        delete workspaceJson.projects[projectName];
    }
    else {
        workspaceJson.projects[projectName] = project;
    }
    json_1.writeJson(tree, path, (_a = workspace_1.reformattedWorkspaceJsonOrNull(workspaceJson)) !== null && _a !== void 0 ? _a : workspaceJson);
}
/**
 * Read the workspace configuration, including projects.
 */
function readWorkspace(tree) {
    const workspaceJson = inlineProjectConfigurationsWithTree(tree);
    const originalVersion = workspaceJson.version;
    return Object.assign(Object.assign({}, workspace_1.toNewFormat(workspaceJson)), { version: originalVersion });
}
exports.readWorkspace = readWorkspace;
/**
 * This has to be separate from the inline functionality inside tao,
 * as the functionality in tao does not use a Tree. Changes made during
 * a generator would not be present during runtime execution.
 * @returns
 */
function inlineProjectConfigurationsWithTree(tree) {
    const workspaceJson = readRawWorkspaceJson(tree);
    Object.entries(workspaceJson.projects || {}).forEach(([project, config]) => {
        if (typeof config === 'string') {
            const configFileLocation = path_1.joinPathFragments(config, 'project.json');
            workspaceJson.projects[project] = json_1.readJson(tree, configFileLocation);
        }
    });
    return workspaceJson;
}
function readRawWorkspaceJson(tree) {
    const path = get_workspace_layout_1.getWorkspacePath(tree);
    return json_1.readJson(tree, path);
}
/**
 * @description Determine where a project's configuration is located.
 * @returns file path if separate from root config, null otherwise.
 */
function getProjectFileLocation(tree, project) {
    var _a;
    const rawWorkspace = readRawWorkspaceJson(tree);
    const projectConfig = (_a = rawWorkspace.projects) === null || _a === void 0 ? void 0 : _a[project];
    return typeof projectConfig === 'string'
        ? path_1.joinPathFragments(projectConfig, 'project.json')
        : null;
}
function validateWorkspaceJsonOperations(mode, workspaceJson, projectName) {
    if (mode == 'create' && workspaceJson.projects[projectName]) {
        throw new Error(`Cannot create Project '${projectName}'. It already exists.`);
    }
    if (mode == 'update' && !workspaceJson.projects[projectName]) {
        throw new Error(`Cannot update Project '${projectName}'. It does not exist.`);
    }
    if (mode == 'delete' && !workspaceJson.projects[projectName]) {
        throw new Error(`Cannot delete Project '${projectName}'. It does not exist.`);
    }
}
//# sourceMappingURL=project-configuration.js.map