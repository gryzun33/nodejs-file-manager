import path from 'path';
import fs from 'fs/promises';

async function removeFile(file) {
  try {
    const pathToFile = path.resolve(process.cwd(), file);
    await fs.rm(pathToFile);
  } catch {
    console.error(`Operation failed`);
  }
}

export { removeFile };
