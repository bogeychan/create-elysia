import fs from 'node:fs';
import path from 'node:path';

/**
 * @param {string} src
 * @param {string} dest
 */
function denoCopySync(src, dest) {
  src = path.resolve(src);
  dest = path.resolve(dest);

  const srcStat = fs.lstatSync(src);

  if (srcStat.isDirectory()) {
    copyDirSync(src, dest);
  } else if (srcStat.isFile()) {
    fs.copyFileSync(src, dest);
  }
}

/**
 * @param {string} src
 * @param {string} dest
 */
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const srcStat = fs.lstatSync(srcPath);
    const destPath = path.join(dest, path.basename(srcPath));

    if (srcStat.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else if (srcStat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.cpSync) {
  //? deno...
  // @ts-ignore
  fs.cpSync = fs.copySync;

  if (!fs.cpSync) {
    //? only in denoland...

    // @ts-ignore
    fs.cpSync = denoCopySync;
  }
}

