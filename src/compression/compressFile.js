import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { pipeline } from 'stream/promises';

async function compressFile(oldPath, destPath) {
  // const fileName = path.basename(oldPath);
  const pathToOldFile = path.resolve(process.cwd(), oldPath);
  const pathToNewFile = path.resolve(process.cwd(), destPath);
  // const pathToNewFile = path.join(pathToNewDirectory, `${fileName}.br`);

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
