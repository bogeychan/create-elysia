import fs from 'node:fs';
import path from 'node:path';

if (!fs.cpSync) {
  //? deno...
  // @ts-ignore
  fs.cpSync = fs.copySync;

  if (!fs.cpSync) {
    //? only in denoland...

    /**
     * @param {string} source
     * @param {string} target
     */
    function copyFileSync(source, target) {
      let targetFile = target;

      // If target is a directory, a new file with the same name will be created
      if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
          targetFile = path.join(target, path.basename(source));
        }
      }

      fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

    /**
     * @param {string} source
     * @param {string} target
     */
    function copyFolderRecursiveSync(source, target) {
      // Copy
      if (fs.lstatSync(source).isDirectory()) {
        for (const filename of fs.readdirSync(source)) {
          const filePath = path.join(source, filename);
          if (fs.lstatSync(filePath).isDirectory()) {
            copyFolderRecursiveSync(filePath, target);
          } else {
            copyFileSync(filePath, target);
          }
        }
      }
    }
    // @ts-ignore
    fs.cpSync = copyFolderRecursiveSync;
  }
}
