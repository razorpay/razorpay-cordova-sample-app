/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/language-service/override_rename_ts_plugin", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.factory = void 0;
    function isAngularCore(path) {
        return isExternalAngularCore(path) || isInternalAngularCore(path);
    }
    function isExternalAngularCore(path) {
        return path.endsWith('@angular/core/core.d.ts') || path.endsWith('@angular/core/index.d.ts');
    }
    function isInternalAngularCore(path) {
        return path.endsWith('angular2/rc/packages/core/index.d.ts');
    }
    /**
     * This factory is used to disable the built-in rename provider,
     * see `packages/language-service/README.md#override-rename-ts-plugin` for more info.
     */
    const factory = () => {
        return {
            create(info) {
                const { project, languageService } = info;
                /** A map that indicates whether Angular could be found in the file's project. */
                const fileToIsInAngularProjectMap = new Map();
                return Object.assign(Object.assign({}, languageService), { getRenameInfo: (fileName, position) => {
                        let isInAngular;
                        if (fileToIsInAngularProjectMap.has(fileName)) {
                            isInAngular = fileToIsInAngularProjectMap.get(fileName);
                        }
                        else {
                            isInAngular = project.getFileNames().some(isAngularCore);
                            fileToIsInAngularProjectMap.set(fileName, isInAngular);
                        }
                        if (isInAngular) {
                            return {
                                canRename: false,
                                localizedErrorMessage: 'Delegating rename to the Angular Language Service.',
                            };
                        }
                        else {
                            return languageService.getRenameInfo(fileName, position);
                        }
                    } });
            }
        };
    };
    exports.factory = factory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnJpZGVfcmVuYW1lX3RzX3BsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xhbmd1YWdlLXNlcnZpY2Uvb3ZlcnJpZGVfcmVuYW1lX3RzX3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFJSCxTQUFTLGFBQWEsQ0FBQyxJQUFZO1FBQ2pDLE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFNBQVMscUJBQXFCLENBQUMsSUFBWTtRQUN6QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELFNBQVMscUJBQXFCLENBQUMsSUFBWTtRQUN6QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxPQUFPLEdBQWtDLEdBQTJCLEVBQUU7UUFDMUUsT0FBTztZQUNMLE1BQU0sQ0FBQyxJQUFnQztnQkFDckMsTUFBTSxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3hDLGlGQUFpRjtnQkFDakYsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLEdBQUcsRUFBbUIsQ0FBQztnQkFFL0QsdUNBQ0ssZUFBZSxLQUNsQixhQUFhLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUU7d0JBQ3BDLElBQUksV0FBb0IsQ0FBQzt3QkFDekIsSUFBSSwyQkFBMkIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7NEJBQzdDLFdBQVcsR0FBRywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFFLENBQUM7eUJBQzFEOzZCQUFNOzRCQUNMLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUN6RCwyQkFBMkIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3lCQUN4RDt3QkFDRCxJQUFJLFdBQVcsRUFBRTs0QkFDZixPQUFPO2dDQUNMLFNBQVMsRUFBRSxLQUFLO2dDQUNoQixxQkFBcUIsRUFBRSxvREFBb0Q7NkJBQzVFLENBQUM7eUJBQ0g7NkJBQU07NEJBQ0wsT0FBTyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzt5QkFDMUQ7b0JBQ0gsQ0FBQyxJQUNEO1lBQ0osQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDLENBQUM7SUFFTSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0L2xpYi90c3NlcnZlcmxpYnJhcnknO1xuXG5mdW5jdGlvbiBpc0FuZ3VsYXJDb3JlKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNFeHRlcm5hbEFuZ3VsYXJDb3JlKHBhdGgpIHx8IGlzSW50ZXJuYWxBbmd1bGFyQ29yZShwYXRoKTtcbn1cblxuZnVuY3Rpb24gaXNFeHRlcm5hbEFuZ3VsYXJDb3JlKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gcGF0aC5lbmRzV2l0aCgnQGFuZ3VsYXIvY29yZS9jb3JlLmQudHMnKSB8fCBwYXRoLmVuZHNXaXRoKCdAYW5ndWxhci9jb3JlL2luZGV4LmQudHMnKTtcbn1cblxuZnVuY3Rpb24gaXNJbnRlcm5hbEFuZ3VsYXJDb3JlKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gcGF0aC5lbmRzV2l0aCgnYW5ndWxhcjIvcmMvcGFja2FnZXMvY29yZS9pbmRleC5kLnRzJyk7XG59XG5cbi8qKlxuICogVGhpcyBmYWN0b3J5IGlzIHVzZWQgdG8gZGlzYWJsZSB0aGUgYnVpbHQtaW4gcmVuYW1lIHByb3ZpZGVyLFxuICogc2VlIGBwYWNrYWdlcy9sYW5ndWFnZS1zZXJ2aWNlL1JFQURNRS5tZCNvdmVycmlkZS1yZW5hbWUtdHMtcGx1Z2luYCBmb3IgbW9yZSBpbmZvLlxuICovXG5jb25zdCBmYWN0b3J5OiB0cy5zZXJ2ZXIuUGx1Z2luTW9kdWxlRmFjdG9yeSA9ICgpOiB0cy5zZXJ2ZXIuUGx1Z2luTW9kdWxlID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjcmVhdGUoaW5mbzogdHMuc2VydmVyLlBsdWdpbkNyZWF0ZUluZm8pOiB0cy5MYW5ndWFnZVNlcnZpY2Uge1xuICAgICAgY29uc3Qge3Byb2plY3QsIGxhbmd1YWdlU2VydmljZX0gPSBpbmZvO1xuICAgICAgLyoqIEEgbWFwIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgQW5ndWxhciBjb3VsZCBiZSBmb3VuZCBpbiB0aGUgZmlsZSdzIHByb2plY3QuICovXG4gICAgICBjb25zdCBmaWxlVG9Jc0luQW5ndWxhclByb2plY3RNYXAgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubGFuZ3VhZ2VTZXJ2aWNlLFxuICAgICAgICBnZXRSZW5hbWVJbmZvOiAoZmlsZU5hbWUsIHBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgbGV0IGlzSW5Bbmd1bGFyOiBib29sZWFuO1xuICAgICAgICAgIGlmIChmaWxlVG9Jc0luQW5ndWxhclByb2plY3RNYXAuaGFzKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgaXNJbkFuZ3VsYXIgPSBmaWxlVG9Jc0luQW5ndWxhclByb2plY3RNYXAuZ2V0KGZpbGVOYW1lKSE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzSW5Bbmd1bGFyID0gcHJvamVjdC5nZXRGaWxlTmFtZXMoKS5zb21lKGlzQW5ndWxhckNvcmUpO1xuICAgICAgICAgICAgZmlsZVRvSXNJbkFuZ3VsYXJQcm9qZWN0TWFwLnNldChmaWxlTmFtZSwgaXNJbkFuZ3VsYXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNJbkFuZ3VsYXIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNhblJlbmFtZTogZmFsc2UsXG4gICAgICAgICAgICAgIGxvY2FsaXplZEVycm9yTWVzc2FnZTogJ0RlbGVnYXRpbmcgcmVuYW1lIHRvIHRoZSBBbmd1bGFyIExhbmd1YWdlIFNlcnZpY2UuJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZVNlcnZpY2UuZ2V0UmVuYW1lSW5mbyhmaWxlTmFtZSwgcG9zaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IHtmYWN0b3J5fTtcbiJdfQ==