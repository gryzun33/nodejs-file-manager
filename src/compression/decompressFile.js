import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { pipeline } from 'stream/promises';

async function decompressFile(oldPath, destPath) {
  // const fileName = path.basename(oldPath).replace(/\.br$/, '');
  const pathToOldFile = path.resolve(process.cwd(), oldPath);
  const pathToNewFile = path.resolve(process.cwd(), destPath);
  // const pathToNewFile = path.join(pathToNewDirectory, `${fileName}`);

  const readStream = fs.createReadStream(pathToOldFile);
  const writeStream = fs.createWriteStream(pathToNewFile);
  const decompress = zlib.createBrotliDecompress();

  try {
    await pipeline(readStream, decompress, writeStream);
    console.log('Decompressed successfully');
  } catch {
    console.error('Operation failed');
  }
}

export { decompressFile };
