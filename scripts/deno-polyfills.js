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
      // Check if folder needs to be created or integrated
      const targetFolder = path.join(target, path.basename(source));

      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
      }

      // Copy
      if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);

        files.forEach((file) => {
          const curSource = path.join(source, file);

          if (fs.lstatSync(curSource).isDirectory()) {
            copyFolderRecursiveSync(curSource, targetFolder);
          } else {
            copyFileSync(curSource, targetFolder);
          }
        });
      }
    }
    // @ts-ignore
    fs.cpSync = copyFolderRecursiveSync;
  }
}

