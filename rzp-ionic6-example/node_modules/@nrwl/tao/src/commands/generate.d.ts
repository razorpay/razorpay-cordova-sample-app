import { Options, Schema } from '../shared/params';
export interface GenerateOptions {
    collectionName: string;
    generatorName: string;
    generatorOptions: Options;
    help: boolean;
    debug: boolean;
    dryRun: boolean;
    force: boolean;
    interactive: boolean;
    defaults: boolean;
}
export declare function printGenHelp(opts: GenerateOptions, schema: Schema): void;
export declare function taoNew(cwd: string, args: string[], isVerbose?: boolean): Promise<any>;
export declare function generate(cwd: string, root: string, args: string[], isVerbose?: boolean): Promise<any>;
