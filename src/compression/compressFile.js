import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { pipeline } from 'stream/promises';

async function compressFile(oldPath, newPath) {
  const fileName = path.parse(oldPath).name;
  const pathToOldFile = path.resolve(process.cwd(), oldPath);
  const pathToNewDirectory = path.resolve(process.cwd(), newPath);
  const pathToNewFile = path.join(pathToNewDirectory, `${fileName}.br`);

  const readStream = fs.createReadStream(pathToOldFile);
  const writeStream = fs.createWriteStream(pathToNewFile);
  const compress = zlib.createBrotliCompress();

  try {
    await pipeline(readStream, compress, writeStream);
    console.log('Compressed successfully');
  } catch {
    console.error('Operation failed');
  }
}

export { compressFile };
