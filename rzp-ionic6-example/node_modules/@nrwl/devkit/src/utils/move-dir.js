"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveFilesToNewDirectory = void 0;
const path_1 = require("path");
const visit_not_ignored_files_1 = require("../generators/visit-not-ignored-files");
const path_2 = require("./path");
function moveFilesToNewDirectory(tree, oldDir, newDir) {
    oldDir = path_2.normalizePath(oldDir);
    newDir = path_2.normalizePath(newDir);
    visit_not_ignored_files_1.visitNotIgnoredFiles(tree, oldDir, (file) => {
        try {
            tree.rename(file, `${newDir}/${path_1.relative(oldDir, file)}`);
        }
        catch (e) {
            if (!tree.exists(oldDir)) {
                console.warn(`Path ${oldDir} does not exist`);
            }
            else if (!tree.exists(newDir)) {
                console.warn(`Path ${newDir} does not exist`);
            }
        }
    });
}
exports.moveFilesToNewDirectory = moveFilesToNewDirectory;
//# sourceMappingURL=move-dir.js.map