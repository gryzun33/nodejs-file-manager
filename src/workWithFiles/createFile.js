import path from 'path';
import fs from 'fs/promises';

async function createFile(file) {
  try {
    const pathToFile = path.resolve(process.cwd(), file);
    await fs.writeFile(pathToFile, '');
  } catch {
    console.error(`Operation failed`);
  }
}

export { createFile };
