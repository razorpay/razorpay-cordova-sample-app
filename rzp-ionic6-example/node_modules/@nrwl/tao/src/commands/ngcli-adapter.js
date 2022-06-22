"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.invokeNew = exports.wrapAngularDevkitSchematic = exports.mockSchematicsForTesting = exports.overrideCollectionResolutionForTesting = exports.runMigration = exports.generate = exports.NxScopeHostUsedForWrappedSchematics = exports.NxScopedHostForMigrations = exports.NxScopedHost = exports.scheduleTarget = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-restricted-imports */
const core_1 = require("@angular-devkit/core");
const chalk = require("chalk");
const node_1 = require("@angular-devkit/core/node");
const package_manager_1 = require("../shared/package-manager");
const workspace_1 = require("../shared/workspace");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_1 = require("../shared/logger");
const fileutils_1 = require("../utils/fileutils");
const json_1 = require("../utils/json");
function scheduleTarget(root, opts, verbose) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { Architect } = require('@angular-devkit/architect');
        const { WorkspaceNodeModulesArchitectHost, } = require('@angular-devkit/architect/node');
        const logger = getTargetLogger(opts.executor, verbose);
        const fsHost = new NxScopedHost(core_1.normalize(root));
        const { workspace } = yield core_1.workspaces.readWorkspace(workspace_1.workspaceConfigName(root), core_1.workspaces.createWorkspaceHost(fsHost));
        const registry = new core_1.schema.CoreSchemaRegistry();
        registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
        const architectHost = new WorkspaceNodeModulesArchitectHost(workspace, root);
        const architect = new Architect(architectHost, registry);
        const run = yield architect.scheduleTarget({
            project: opts.project,
            target: opts.target,
            configuration: opts.configuration,
        }, opts.runOptions, { logger });
        return run.output;
    });
}
exports.scheduleTarget = scheduleTarget;
function createWorkflow(fsHost, root, opts) {
    const NodeWorkflow = require('@angular-devkit/schematics/tools').NodeWorkflow;
    const workflow = new NodeWorkflow(fsHost, {
        force: opts.force,
        dryRun: opts.dryRun,
        packageManager: package_manager_1.detectPackageManager(),
        root: core_1.normalize(root),
        registry: new core_1.schema.CoreSchemaRegistry(require('@angular-devkit/schematics').formats.standardFormats),
        resolvePaths: [process.cwd(), root],
    });
    workflow.registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
    workflow.engineHost.registerOptionsTransform(require('@angular-devkit/schematics/tools').validateOptionsWithSchema(workflow.registry));
    if (opts.interactive) {
        workflow.registry.usePromptProvider(createPromptProvider());
    }
    return workflow;
}
function getCollection(workflow, name) {
    const collection = workflow.engine.createCollection(name);
    if (!collection)
        throw new Error(`Cannot find collection '${name}'`);
    return collection;
}
function createRecorder(host, record, logger) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const actualConfigName = yield host.workspaceConfigName();
        return (event) => {
            let eventPath = event.path.startsWith('/')
                ? event.path.substr(1)
                : event.path;
            if (eventPath === 'workspace.json' || eventPath === 'angular.json') {
                eventPath = actualConfigName;
            }
            if (event.kind === 'error') {
                record.error = true;
                logger.warn(`ERROR! ${eventPath} ${event.description == 'alreadyExist'
                    ? 'already exists'
                    : 'does not exist.'}.`);
            }
            else if (event.kind === 'update') {
                record.loggingQueue.push(core_1.tags.oneLine `${chalk.white('UPDATE')} ${eventPath}`);
            }
            else if (event.kind === 'create') {
                record.loggingQueue.push(core_1.tags.oneLine `${chalk.green('CREATE')} ${eventPath}`);
            }
            else if (event.kind === 'delete') {
                record.loggingQueue.push(`${chalk.yellow('DELETE')} ${eventPath}`);
            }
            else if (event.kind === 'rename') {
                record.loggingQueue.push(`${chalk.blue('RENAME')} ${eventPath} => ${event.to}`);
            }
        };
    });
}
function runSchematic(host, root, workflow, logger, opts, schematic, printDryRunMessage = true, recorder = null) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const record = { loggingQueue: [], error: false };
        workflow.reporter.subscribe(recorder || (yield createRecorder(host, record, logger)));
        try {
            yield workflow
                .execute({
                collection: opts.collectionName,
                schematic: opts.generatorName,
                options: opts.generatorOptions,
                debug: opts.debug,
                logger,
            })
                .toPromise();
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        if (!record.error) {
            record.loggingQueue.forEach((log) => logger.info(log));
        }
        if (opts.dryRun && printDryRunMessage) {
            logger.warn(`\nNOTE: The "dryRun" flag means no changes were made.`);
        }
        return { status: 0, loggingQueue: record.loggingQueue };
    });
}
class NxScopedHost extends core_1.virtualFs.ScopedHost {
    constructor(root) {
        super(new node_1.NodeJsSyncHost(), root);
        this.__readWorkspaceConfiguration = (configFileName, overrides) => {
            return super.exists('nx.json').pipe(operators_1.switchMap((nxJsonExists) => (!nxJsonExists // if no nxJson, let it be undefined
                ? ((overrides === null || overrides === void 0 ? void 0 : overrides.workspace) || super.read(configFileName)).pipe(operators_1.map((x) => [x]))
                : rxjs_1.combineLatest([
                    // read both values
                    (overrides === null || overrides === void 0 ? void 0 : overrides.workspace) || super.read(configFileName),
                    (overrides === null || overrides === void 0 ? void 0 : overrides.nx) || super.read('nx.json'),
                ])).pipe(operators_1.switchMap(([w, n]) => {
                var _a, _b, _c;
                try {
                    // parse both from json, nxJson may be null
                    const workspaceJson = json_1.parseJson(Buffer.from(w).toString());
                    const nxJson = n
                        ? json_1.parseJson(Buffer.from(n).toString())
                        : null;
                    // assign props ng cli expects from nx json, if it exists
                    (_a = workspaceJson.cli) !== null && _a !== void 0 ? _a : (workspaceJson.cli = nxJson === null || nxJson === void 0 ? void 0 : nxJson.cli);
                    (_b = workspaceJson.generators) !== null && _b !== void 0 ? _b : (workspaceJson.generators = nxJson === null || nxJson === void 0 ? void 0 : nxJson.generators);
                    (_c = workspaceJson.defaultProject) !== null && _c !== void 0 ? _c : (workspaceJson.defaultProject = nxJson === null || nxJson === void 0 ? void 0 : nxJson.defaultProject);
                    // resolve inline configurations and downlevel format
                    return this.resolveInlineProjectConfigurations(workspaceJson).pipe(operators_1.map((x) => {
                        if (workspaceJson.version === 2) {
                            const formatted = workspace_1.toOldFormatOrNull(workspaceJson);
                            return formatted
                                ? Buffer.from(json_1.serializeJson(formatted))
                                : Buffer.from(json_1.serializeJson(x));
                        }
                        return Buffer.from(json_1.serializeJson(x));
                    }));
                }
                catch (_d) {
                    return rxjs_1.of(w);
                }
            }))));
        };
    }
    read(path) {
        return this.context(path).pipe(operators_1.switchMap((r) => {
            if (r.isWorkspaceConfig) {
                return this.__readWorkspaceConfiguration(r.actualConfigFileName);
            }
            else {
                return super.read(path);
            }
        }));
    }
    write(path, content) {
        return this.context(path).pipe(operators_1.switchMap((r) => {
            if (r.isWorkspaceConfig) {
                return this.writeWorkspaceConfiguration(r, content);
            }
            else {
                return super.write(path, content);
            }
        }));
    }
    isFile(path) {
        return this.context(path).pipe(operators_1.switchMap((r) => {
            if (r.isWorkspaceConfig) {
                return super.isFile(r.actualConfigFileName);
            }
            else {
                return super.isFile(path);
            }
        }));
    }
    exists(path) {
        return this.context(path).pipe(operators_1.switchMap((r) => {
            if (r.isWorkspaceConfig) {
                return super.exists(r.actualConfigFileName);
            }
            else {
                return super.exists(path);
            }
        }));
    }
    workspaceConfigName() {
        return super
            .exists('/angular.json')
            .pipe(operators_1.map((hasAngularJson) => hasAngularJson ? 'angular.json' : 'workspace.json'))
            .toPromise();
    }
    context(path) {
        if (isWorkspaceConfigPath(path)) {
            return super.exists('/angular.json').pipe(operators_1.switchMap((isAngularJson) => {
                const actualConfigFileName = isAngularJson
                    ? '/angular.json'
                    : '/workspace.json';
                return super.read(actualConfigFileName).pipe(operators_1.map((r) => {
                    try {
                        const w = json_1.parseJson(Buffer.from(r).toString());
                        return {
                            isWorkspaceConfig: true,
                            actualConfigFileName,
                            isNewFormat: w.version === 2,
                        };
                    }
                    catch (_a) {
                        return {
                            isWorkspaceConfig: true,
                            actualConfigFileName,
                            isNewFormat: false,
                        };
                    }
                }));
            }));
        }
        else {
            return rxjs_1.of({
                isWorkspaceConfig: false,
                actualConfigFileName: null,
                isNewFormat: false,
            });
        }
    }
    writeWorkspaceConfiguration(context, content) {
        const config = json_1.parseJson(Buffer.from(content).toString());
        if (context.isNewFormat) {
            try {
                const w = json_1.parseJson(Buffer.from(content).toString());
                const formatted = workspace_1.toNewFormatOrNull(w);
                if (formatted) {
                    const { cli, generators, defaultProject } = formatted, workspaceJson = tslib_1.__rest(formatted, ["cli", "generators", "defaultProject"]);
                    return rxjs_1.concat(this.writeWorkspaceConfigFiles(context, workspaceJson), cli || generators || defaultProject
                        ? this.__saveNxJsonProps({ cli, generators, defaultProject })
                        : rxjs_1.of(null));
                }
                else {
                    const { cli, schematics, generators, defaultProject } = w, angularJson = tslib_1.__rest(w, ["cli", "schematics", "generators", "defaultProject"]);
                    return rxjs_1.concat(this.writeWorkspaceConfigFiles(context.actualConfigFileName, angularJson), cli || schematics
                        ? this.__saveNxJsonProps({
                            cli,
                            defaultProject,
                            generators: schematics || generators,
                        })
                        : rxjs_1.of(null));
                }
            }
            catch (e) { }
        }
        const { cli, schematics, generators, defaultProject } = config, angularJson = tslib_1.__rest(config, ["cli", "schematics", "generators", "defaultProject"]);
        return rxjs_1.concat(this.writeWorkspaceConfigFiles(context, angularJson), this.__saveNxJsonProps({
            cli,
            defaultProject,
            generators: schematics || generators,
        }));
    }
    __saveNxJsonProps(props) {
        const nxJsonPath = 'nx.json';
        return super.read(nxJsonPath).pipe(operators_1.switchMap((buf) => {
            const nxJson = json_1.parseJson(Buffer.from(buf).toString());
            Object.assign(nxJson, props);
            return super.write(nxJsonPath, Buffer.from(json_1.serializeJson(nxJson)));
        }));
    }
    writeWorkspaceConfigFiles({ actualConfigFileName: workspaceFileName, isNewFormat }, config) {
        // copy to avoid removing inlined config files.
        let writeObservable;
        const configToWrite = Object.assign(Object.assign({}, config), { projects: Object.assign({}, config.projects) });
        const projects = Object.entries(configToWrite.projects);
        for (const [project, projectConfig] of projects) {
            if (projectConfig.configFilePath) {
                if (!isNewFormat) {
                    throw new Error('Attempted to write standalone project configuration into a v1 workspace');
                }
                // project was read from a project.json file
                const configPath = projectConfig.configFilePath;
                const fileConfigObject = Object.assign({}, projectConfig);
                delete fileConfigObject.configFilePath; // remove the configFilePath before writing
                const projectJsonWrite = super.write(configPath, Buffer.from(json_1.serializeJson(fileConfigObject))); // write back to the project.json file
                writeObservable = writeObservable
                    ? rxjs_1.concat(writeObservable, projectJsonWrite)
                    : projectJsonWrite;
                configToWrite.projects[project] = core_1.normalize(path_1.dirname(configPath)); // update the config object to point to the written file.
            }
        }
        const workspaceJsonWrite = super.write(workspaceFileName, Buffer.from(json_1.serializeJson(configToWrite)));
        return writeObservable
            ? rxjs_1.concat(writeObservable, workspaceJsonWrite)
            : workspaceJsonWrite;
    }
    resolveInlineProjectConfigurations(config) {
        var _a;
        // Creates an observable where each emission is a project configuration
        // that is not listed inside workspace.json. Each time it encounters a
        // standalone config, observable is updated by concatenating the new
        // config read operation.
        let observable = rxjs_1.EMPTY;
        Object.entries((_a = config.projects) !== null && _a !== void 0 ? _a : {}).forEach(([project, projectConfig]) => {
            if (typeof projectConfig === 'string') {
                // configFilePath is not written to files, but is stored on the config object
                // so that we know where to save the project's configuration if it was updated
                // by another angular schematic.
                const configFilePath = path_1.join(projectConfig, 'project.json');
                const next = this.read(configFilePath).pipe(operators_1.map((x) => ({
                    project,
                    projectConfig: Object.assign(Object.assign({}, json_1.parseJson(Buffer.from(x).toString())), { configFilePath }),
                })));
                observable = observable ? rxjs_1.concat(observable, next) : next;
            }
        });
        return observable.pipe(
        // Collect all values from the project.json read operations
        operators_1.toArray(), 
        // Use these collected values to update the inline configurations
        operators_1.map((x) => {
            x.forEach(({ project, projectConfig }) => {
                config.projects[project] = projectConfig;
            });
            return config;
        }));
    }
}
exports.NxScopedHost = NxScopedHost;
/**
 * This host contains the workaround needed to run Angular migrations
 */
class NxScopedHostForMigrations extends NxScopedHost {
    constructor(root) {
        super(root);
    }
    read(path) {
        if (isWorkspaceConfigPath(path)) {
            return super.read(path).pipe(operators_1.map(processConfigWhenReading));
        }
        else {
            return super.read(path);
        }
    }
    write(path, content) {
        if (isWorkspaceConfigPath(path)) {
            return super.write(path, processConfigWhenWriting(content));
        }
        else {
            return super.write(path, content);
        }
    }
}
exports.NxScopedHostForMigrations = NxScopedHostForMigrations;
class NxScopeHostUsedForWrappedSchematics extends NxScopedHost {
    constructor(root, host) {
        super(root);
        this.host = host;
    }
    read(path) {
        if (isWorkspaceConfigPath(path)) {
            const match = findWorkspaceConfigFileChange(this.host);
            const nxJsonChange = findMatchingFileChange(this.host, 'nx.json');
            // no match, default to existing behavior
            if (!match) {
                return super.read(path);
            }
            // we try to format it, if it changes, return it, otherwise return the original change
            try {
                return this.__readWorkspaceConfiguration(match.path, {
                    workspace: rxjs_1.of(match.content),
                    nx: nxJsonChange ? rxjs_1.of(nxJsonChange.content) : null,
                });
            }
            catch (e) {
                return super.read(path);
            }
        }
        else {
            const match = findMatchingFileChange(this.host, path);
            if (match) {
                // found a matching change in the host
                return rxjs_1.of(Buffer.from(match.content));
            }
            else if (
            // found a change to workspace config, and reading a project config file
            path_1.basename(path) === 'project.json' &&
                findWorkspaceConfigFileChange(this.host)) {
                return rxjs_1.of(this.host.read(path));
            }
            else {
                // found neither, use default read method
                return super.read(path);
            }
        }
    }
    exists(path) {
        if (isWorkspaceConfigPath(path)) {
            return findWorkspaceConfigFileChange(this.host)
                ? rxjs_1.of(true)
                : super.exists(path);
        }
        else {
            return findMatchingFileChange(this.host, path)
                ? rxjs_1.of(true)
                : super.exists(path);
        }
    }
    isDirectory(path) {
        return super.isDirectory(path).pipe(operators_1.catchError(() => rxjs_1.of(false)), operators_1.switchMap((isDirectory) => isDirectory
            ? rxjs_1.of(true)
            : rxjs_1.of(this.host.exists(path) && !this.host.isFile(path))));
    }
    isFile(path) {
        if (isWorkspaceConfigPath(path)) {
            return findWorkspaceConfigFileChange(this.host)
                ? rxjs_1.of(true)
                : super.isFile(path);
        }
        else {
            return findMatchingFileChange(this.host, path)
                ? rxjs_1.of(true)
                : super.isFile(path);
        }
    }
    list(path) {
        const fragments = this.host.children(path).map((child) => core_1.fragment(child));
        return rxjs_1.of(fragments);
    }
}
exports.NxScopeHostUsedForWrappedSchematics = NxScopeHostUsedForWrappedSchematics;
function findWorkspaceConfigFileChange(host) {
    return host
        .listChanges()
        .find((f) => f.path == 'workspace.json' || f.path == 'angular.json');
}
function findMatchingFileChange(host, path) {
    const targetPath = path.startsWith('/') ? path.substring(1) : path.toString;
    return host
        .listChanges()
        .find((f) => f.path == targetPath.toString() && f.type !== 'DELETE');
}
function isWorkspaceConfigPath(p) {
    return (p === 'angular.json' ||
        p === '/angular.json' ||
        p === 'workspace.json' ||
        p === '/workspace.json');
}
function processConfigWhenReading(content) {
    try {
        const json = json_1.parseJson(Buffer.from(content).toString());
        Object.values(json.projects).forEach((p) => {
            try {
                Object.values(p.architect || p.targets).forEach((e) => {
                    if ((e.builder === '@nrwl/jest:jest' ||
                        e.executor === '@nrwl/jest:jest') &&
                        !e.options.tsConfig) {
                        e.options.tsConfig = `${p.root}/tsconfig.spec.json`;
                    }
                });
            }
            catch (e) { }
        });
        return Buffer.from(json_1.serializeJson(json));
    }
    catch (e) {
        return content;
    }
}
function processConfigWhenWriting(content) {
    try {
        const json = json_1.parseJson(Buffer.from(content).toString());
        Object.values(json.projects).forEach((p) => {
            try {
                Object.values(p.architect || p.targets).forEach((e) => {
                    if ((e.builder === '@nrwl/jest:jest' ||
                        e.executor === '@nrwl/jest:jest') &&
                        e.options.tsConfig) {
                        delete e.options.tsConfig;
                    }
                });
            }
            catch (e) { }
        });
        return Buffer.from(json_1.serializeJson(json));
    }
    catch (e) {
        return content;
    }
}
function generate(root, opts, verbose) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = exports.getLogger(verbose);
        const fsHost = new NxScopedHost(core_1.normalize(root));
        const workflow = createWorkflow(fsHost, root, opts);
        const collection = getCollection(workflow, opts.collectionName);
        const schematic = collection.createSchematic(opts.generatorName, true);
        return (yield runSchematic(fsHost, root, workflow, logger, Object.assign(Object.assign({}, opts), { generatorName: schematic.description.name }), schematic)).status;
    });
}
exports.generate = generate;
function createPromptProvider() {
    return (definitions) => {
        const questions = definitions.map((definition) => {
            const question = {
                name: definition.id,
                message: definition.message,
            };
            if (definition.default) {
                question.initial = definition.default;
            }
            const validator = definition.validator;
            if (validator) {
                question.validate = (input) => validator(input);
            }
            switch (definition.type) {
                case 'string':
                case 'input':
                    return Object.assign(Object.assign({}, question), { type: 'input' });
                case 'boolean':
                case 'confirmation':
                case 'confirm':
                    return Object.assign(Object.assign({}, question), { type: 'confirm' });
                case 'number':
                case 'numeral':
                    return Object.assign(Object.assign({}, question), { type: 'numeral' });
                case 'list':
                    return Object.assign(Object.assign({}, question), { type: !!definition.multiselect ? 'multiselect' : 'select', choices: definition.items &&
                            definition.items.map((item) => {
                                if (typeof item == 'string') {
                                    return item;
                                }
                                else {
                                    return {
                                        message: item.label,
                                        name: item.value,
                                    };
                                }
                            }) });
                default:
                    return Object.assign(Object.assign({}, question), { type: definition.type });
            }
        });
        return require('enquirer').prompt(questions);
    };
}
function runMigration(root, packageName, migrationName, isVerbose) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = exports.getLogger(isVerbose);
        const fsHost = new NxScopedHost(core_1.normalize(root));
        const workflow = createWorkflow(fsHost, root, {});
        const collection = resolveMigrationsCollection(packageName);
        return workflow
            .execute({
            collection,
            schematic: migrationName,
            options: {},
            debug: false,
            logger: logger,
        })
            .toPromise();
    });
}
exports.runMigration = runMigration;
function resolveMigrationsCollection(name) {
    var _a;
    let collectionPath = undefined;
    if (name.startsWith('.') || name.startsWith('/')) {
        name = path_1.resolve(name);
    }
    if (path_1.extname(name)) {
        collectionPath = require.resolve(name);
    }
    else {
        let packageJsonPath;
        try {
            packageJsonPath = require.resolve(path_1.join(name, 'package.json'), {
                paths: [process.cwd()],
            });
        }
        catch (e) {
            // workaround for a bug in node 12
            packageJsonPath = require.resolve(path_1.join(process.cwd(), name, 'package.json'));
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const packageJson = require(packageJsonPath);
        let pkgJsonSchematics = (_a = packageJson['nx-migrations']) !== null && _a !== void 0 ? _a : packageJson['ng-update'];
        if (!pkgJsonSchematics) {
            throw new Error(`Could not find migrations in package: "${name}"`);
        }
        if (typeof pkgJsonSchematics != 'string') {
            pkgJsonSchematics = pkgJsonSchematics.migrations;
        }
        collectionPath = require.resolve(pkgJsonSchematics, {
            paths: [path_1.dirname(packageJsonPath)],
        });
    }
    try {
        if (collectionPath) {
            fileutils_1.readJsonFile(collectionPath);
            return collectionPath;
        }
    }
    catch (_b) {
        throw new Error(`Invalid migration file in package: "${name}"`);
    }
    throw new Error(`Collection cannot be resolved: "${name}"`);
}
function convertEventTypeToHandleMultipleConfigNames(host, eventPath, content) {
    const actualConfigName = host.exists('/angular.json')
        ? 'angular.json'
        : 'workspace.json';
    const isWorkspaceConfig = eventPath === 'angular.json' || eventPath === 'workspace.json';
    if (isWorkspaceConfig) {
        let isNewFormat = true;
        try {
            isNewFormat =
                json_1.parseJson(host.read(actualConfigName, 'utf-8')).version === 2;
        }
        catch (e) { }
        if (content && isNewFormat) {
            const formatted = workspace_1.toNewFormat(json_1.parseJson(content.toString()));
            if (formatted) {
                return {
                    eventPath: actualConfigName,
                    content: Buffer.from(json_1.serializeJson(formatted)),
                };
            }
            else {
                return { eventPath: actualConfigName, content };
            }
        }
        else {
            return { eventPath: actualConfigName, content };
        }
    }
    else {
        return { eventPath, content };
    }
}
let collectionResolutionOverrides = null;
let mockedSchematics = null;
/**
 * By default, Angular Devkit schematic collections will be resolved using the Node resolution.
 * This doesn't work if you are testing schematics that refer to other schematics in the
 * same repo.
 *
 * This function can can be used to override the resolution behaviour.
 *
 * Example:
 *
 * ```typescript
 *   overrideCollectionResolutionForTesting({
 *     '@nrwl/workspace': path.join(__dirname, '../../../../workspace/generators.json'),
 *     '@nrwl/angular': path.join(__dirname, '../../../../angular/generators.json'),
 *     '@nrwl/linter': path.join(__dirname, '../../../../linter/generators.json')
 *   });
 *
 * ```
 */
function overrideCollectionResolutionForTesting(collections) {
    collectionResolutionOverrides = collections;
}
exports.overrideCollectionResolutionForTesting = overrideCollectionResolutionForTesting;
/**
 * If you have an Nx Devkit generator invoking the wrapped Angular Devkit schematic,
 * and you don't want the Angular Devkit schematic to run, you can mock it up using this function.
 *
 * Unfortunately, there are some edge cases in the Nx-Angular devkit integration that
 * can be seen in the unit tests context. This function is useful for handling that as well.
 *
 * In this case, you can mock it up.
 *
 * Example:
 *
 * ```typescript
 *   mockSchematicsForTesting({
 *     'mycollection:myschematic': (tree, params) => {
 *        tree.write('README.md');
 *     }
 *   });
 *
 * ```
 */
function mockSchematicsForTesting(schematics) {
    mockedSchematics = schematics;
}
exports.mockSchematicsForTesting = mockSchematicsForTesting;
function wrapAngularDevkitSchematic(collectionName, generatorName) {
    return (host, generatorOptions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (mockedSchematics &&
            mockedSchematics[`${collectionName}:${generatorName}`]) {
            return yield mockedSchematics[`${collectionName}:${generatorName}`](host, generatorOptions);
        }
        const emptyLogger = {
            log: (e) => { },
            info: (e) => { },
            warn: (e) => { },
            debug: () => { },
            error: (e) => { },
            fatal: (e) => { },
        };
        emptyLogger.createChild = () => emptyLogger;
        const recorder = (event) => {
            let eventPath = event.path.startsWith('/')
                ? event.path.substr(1)
                : event.path;
            const r = convertEventTypeToHandleMultipleConfigNames(host, eventPath, event.content);
            if (event.kind === 'error') {
            }
            else if (event.kind === 'update') {
                if (r.eventPath === 'angular.json' ||
                    r.eventPath === 'workspace.json') {
                    saveWorkspaceConfigurationInWrappedSchematic(host, r);
                }
                host.write(r.eventPath, r.content);
            }
            else if (event.kind === 'create') {
                host.write(r.eventPath, r.content);
            }
            else if (event.kind === 'delete') {
                host.delete(r.eventPath);
            }
            else if (event.kind === 'rename') {
                host.rename(r.eventPath, event.to);
            }
        };
        const fsHost = new NxScopeHostUsedForWrappedSchematics(core_1.normalize(host.root), host);
        const options = {
            generatorOptions,
            dryRun: true,
            interactive: false,
            help: false,
            debug: false,
            collectionName,
            generatorName,
            force: false,
            defaults: false,
        };
        const workflow = createWorkflow(fsHost, host.root, options);
        // used for testing
        if (collectionResolutionOverrides) {
            const r = workflow.engineHost.resolve;
            workflow.engineHost.resolve = (collection, b, c) => {
                if (collectionResolutionOverrides[collection]) {
                    return collectionResolutionOverrides[collection];
                }
                else {
                    return r.apply(workflow.engineHost, [collection, b, c]);
                }
            };
        }
        const collection = getCollection(workflow, collectionName);
        const schematic = collection.createSchematic(generatorName, true);
        const res = yield runSchematic(fsHost, host.root, workflow, emptyLogger, options, schematic, false, recorder);
        if (res.status !== 0) {
            throw new Error(res.loggingQueue.join('\n'));
        }
    });
}
exports.wrapAngularDevkitSchematic = wrapAngularDevkitSchematic;
function invokeNew(root, opts, verbose) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = exports.getLogger(verbose);
        const fsHost = new NxScopedHost(core_1.normalize(root));
        const workflow = createWorkflow(fsHost, root, opts);
        const collection = getCollection(workflow, opts.collectionName);
        const schematic = collection.createSchematic('new', true);
        return (yield runSchematic(fsHost, root, workflow, logger, Object.assign(Object.assign({}, opts), { generatorName: schematic.description.name }), schematic)).status;
    });
}
exports.invokeNew = invokeNew;
let logger;
const loggerColors = {
    warn: (s) => chalk.bold(chalk.yellow(s)),
    error: (s) => {
        if (s.startsWith('NX ')) {
            return `\n${logger_1.NX_ERROR} ${chalk.bold(chalk.red(s.substr(3)))}\n`;
        }
        return chalk.bold(chalk.red(s));
    },
    info: (s) => {
        if (s.startsWith('NX ')) {
            return `\n${logger_1.NX_PREFIX} ${chalk.bold(s.substr(3))}\n`;
        }
        return chalk.white(s);
    },
};
const getLogger = (isVerbose = false) => {
    if (!logger) {
        logger = node_1.createConsoleLogger(isVerbose, process.stdout, process.stderr, loggerColors);
    }
    return logger;
};
exports.getLogger = getLogger;
const getTargetLogger = (executor, isVerbose = false) => {
    if (executor !== '@angular-devkit/build-angular:tslint') {
        return exports.getLogger(isVerbose);
    }
    const tslintExecutorLogger = node_1.createConsoleLogger(isVerbose, process.stdout, process.stderr, Object.assign(Object.assign({}, loggerColors), { warn: (s) => {
            if (s.startsWith(`TSLint's support is discontinued and we're deprecating its support in Angular CLI.`)) {
                s =
                    `TSLint's support is discontinued and the @angular-devkit/build-angular:tslint executor is deprecated.\n` +
                        'To start using a modern linter tool, please consider replacing TSLint with ESLint. ' +
                        'You can use the "@nrwl/angular:convert-tslint-to-eslint" generator to automatically convert your projects.\n' +
                        'For more info, visit https://nx.dev/latest/angular/angular/convert-tslint-to-eslint.';
            }
            return chalk.bold(chalk.yellow(s));
        } }));
    return tslintExecutorLogger;
};
function saveWorkspaceConfigurationInWrappedSchematic(host, r) {
    const workspace = json_1.parseJson(r.content.toString());
    for (const [project, config] of Object.entries(workspace.projects)) {
        if (typeof config === 'object' && config.configFilePath) {
            const path = config.configFilePath;
            workspace.projects[project] = core_1.normalize(path_1.dirname(path));
            delete config.configFilePath;
            host.write(path, json_1.serializeJson(config));
        }
    }
    const nxJson = json_1.parseJson(host.read('nx.json').toString());
    nxJson.generators = workspace.generators || workspace.schematics;
    nxJson.cli = workspace.cli || nxJson.cli;
    nxJson.defaultProject = workspace.defaultProject;
    delete workspace.cli;
    delete workspace.generators;
    delete workspace.schematics;
    r.content = Buffer.from(json_1.serializeJson(workspace));
}
//# sourceMappingURL=ngcli-adapter.js.map