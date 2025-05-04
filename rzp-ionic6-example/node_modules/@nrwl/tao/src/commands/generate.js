"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.taoNew = exports.printGenHelp = void 0;
const tslib_1 = require("tslib");
const yargsParser = require("yargs-parser");
const params_1 = require("../shared/params");
const print_help_1 = require("../shared/print-help");
const workspace_1 = require("../shared/workspace");
const tree_1 = require("../shared/tree");
const logger_1 = require("../shared/logger");
const chalk = require("chalk");
function throwInvalidInvocation() {
    throw new Error(`Specify the generator name (e.g., nx generate @nrwl/workspace:library)`);
}
function parseGenerateOpts(args, mode, defaultCollection) {
    const generatorOptions = params_1.convertToCamelCase(yargsParser(args, {
        boolean: ['help', 'dryRun', 'debug', 'force', 'interactive', 'defaults'],
        alias: {
            dryRun: 'dry-run',
            d: 'dryRun',
        },
        default: {
            debug: false,
            dryRun: false,
            interactive: true,
        },
    }));
    // TODO: vsavkin remove defaults in Nx 13
    if (generatorOptions.defaults) {
        logger_1.logger.warn(`Use --no-interactive instead of --defaults. The --defaults option will be removed in Nx 13.`);
        generatorOptions.interactive = false;
    }
    let collectionName = null;
    let generatorName = null;
    if (mode === 'generate') {
        if (!generatorOptions['_'] ||
            generatorOptions['_'].length === 0) {
            throwInvalidInvocation();
        }
        const generatorDescriptor = generatorOptions['_'].shift();
        const separatorIndex = generatorDescriptor.lastIndexOf(':');
        if (separatorIndex > 0) {
            collectionName = generatorDescriptor.substr(0, separatorIndex);
            generatorName = generatorDescriptor.substr(separatorIndex + 1);
        }
        else {
            collectionName = defaultCollection;
            generatorName = generatorDescriptor;
        }
    }
    else {
        collectionName = generatorOptions.collection;
        generatorName = 'new';
    }
    if (!collectionName) {
        throwInvalidInvocation();
    }
    const res = {
        collectionName,
        generatorName,
        generatorOptions,
        help: generatorOptions.help,
        debug: generatorOptions.debug,
        dryRun: generatorOptions.dryRun,
        force: generatorOptions.force,
        interactive: generatorOptions.interactive,
        defaults: generatorOptions.defaults,
    };
    delete generatorOptions.debug;
    delete generatorOptions.d;
    delete generatorOptions.dryRun;
    delete generatorOptions.force;
    delete generatorOptions.interactive;
    delete generatorOptions.defaults;
    delete generatorOptions.help;
    delete generatorOptions.collection;
    delete generatorOptions['--'];
    return res;
}
function printGenHelp(opts, schema) {
    print_help_1.printHelp(`nx generate ${opts.collectionName}:${opts.generatorName}`, Object.assign(Object.assign({}, schema), { properties: Object.assign(Object.assign({}, schema.properties), { dryRun: {
                type: 'boolean',
                default: false,
                description: `Runs through and reports activity without writing to disk.`,
            } }) }));
}
exports.printGenHelp = printGenHelp;
function readDefaultCollection(nxConfig) {
    return nxConfig.cli ? nxConfig.cli.defaultCollection : null;
}
function printChanges(fileChanges) {
    fileChanges.forEach((f) => {
        if (f.type === 'CREATE') {
            console.log(`${chalk.green('CREATE')} ${f.path}`);
        }
        else if (f.type === 'UPDATE') {
            console.log(`${chalk.white('UPDATE')} ${f.path}`);
        }
        else if (f.type === 'DELETE') {
            console.log(`${chalk.yellow('DELETE')} ${f.path}`);
        }
    });
}
function taoNew(cwd, args, isVerbose = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const ws = new workspace_1.Workspaces(null);
        return params_1.handleErrors(isVerbose, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const opts = parseGenerateOpts(args, 'new', null);
            const { normalizedGeneratorName, schema, implementationFactory } = ws.readGenerator(opts.collectionName, opts.generatorName);
            const combinedOpts = yield params_1.combineOptionsForGenerator(opts.generatorOptions, opts.collectionName, normalizedGeneratorName, null, schema, opts.interactive, null, null, isVerbose);
            if (ws.isNxGenerator(opts.collectionName, normalizedGeneratorName)) {
                const host = new tree_1.FsTree(cwd, isVerbose);
                const implementation = implementationFactory();
                const task = yield implementation(host, combinedOpts);
                const changes = host.listChanges();
                printChanges(changes);
                if (!opts.dryRun) {
                    tree_1.flushChanges(cwd, changes);
                    if (task) {
                        yield task();
                    }
                }
                else {
                    logger_1.logger.warn(`\nNOTE: The "dryRun" flag means no changes were made.`);
                }
            }
            else {
                return (yield Promise.resolve().then(() => require('./ngcli-adapter'))).generate(cwd, Object.assign(Object.assign({}, opts), { generatorOptions: combinedOpts }), isVerbose);
            }
        }));
    });
}
exports.taoNew = taoNew;
function generate(cwd, root, args, isVerbose = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const ws = new workspace_1.Workspaces(root);
        return params_1.handleErrors(isVerbose, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const workspaceDefinition = ws.readWorkspaceConfiguration();
            const opts = parseGenerateOpts(args, 'generate', readDefaultCollection(workspaceDefinition));
            const { normalizedGeneratorName, schema, implementationFactory } = ws.readGenerator(opts.collectionName, opts.generatorName);
            if (opts.help) {
                printGenHelp(opts, schema);
                return 0;
            }
            const combinedOpts = yield params_1.combineOptionsForGenerator(opts.generatorOptions, opts.collectionName, normalizedGeneratorName, workspaceDefinition, schema, opts.interactive, ws.calculateDefaultProjectName(cwd, workspaceDefinition), ws.relativeCwd(cwd), isVerbose);
            if (ws.isNxGenerator(opts.collectionName, normalizedGeneratorName)) {
                const host = new tree_1.FsTree(root, isVerbose);
                const implementation = implementationFactory();
                const task = yield implementation(host, combinedOpts);
                const changes = host.listChanges();
                printChanges(changes);
                if (!opts.dryRun) {
                    tree_1.flushChanges(root, changes);
                    if (task) {
                        yield task();
                    }
                }
                else {
                    logger_1.logger.warn(`\nNOTE: The "dryRun" flag means no changes were made.`);
                }
            }
            else {
                require('../compat/compat');
                return (yield Promise.resolve().then(() => require('./ngcli-adapter'))).generate(root, Object.assign(Object.assign({}, opts), { generatorOptions: combinedOpts }), isVerbose);
            }
        }));
    });
}
exports.generate = generate;
//# sourceMappingURL=generate.js.map