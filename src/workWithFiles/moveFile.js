import path from 'path';
import fs from 'fs/promises';

async function moveFile(oldPath, newPath) {
  try {
    const fileName = path.basename(oldPath);
    const pathToOldFile = path.resolve(process.cwd(), oldPath);
    const pathToNewDirectory = path.resolve(process.cwd(), newPath);
    const pathToNewFile = path.join(pathToNewDirectory, fileName);
    await fs.rename(pathToOldFile, pathToNewFile);
  } catch {
    console.error(`Operation failed`);
  }
}

export { moveFile };
