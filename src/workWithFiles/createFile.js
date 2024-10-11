import path from 'path';
import fs from 'fs/promises';

async function createFile(file) {
  const pathToFile = path.resolve(process.cwd(), file);

  try {
    await fs.writeFile(pathToFile, '');
  } catch (err) {
    console.error(`Operation failed`);
  }
}

export { createFile };
