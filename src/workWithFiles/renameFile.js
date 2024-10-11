import path from 'path';
import fs from 'fs/promises';

async function renameFile(oldPath, newPath) {
  try {
    const pathToOldFile = path.resolve(process.cwd(), oldPath);
    const pathToNewFile = path.resolve(process.cwd(), newPath);
    await fs.rename(pathToOldFile, pathToNewFile);
  } catch {
    console.error(`Operation failed`);
  }
}

export { renameFile };
