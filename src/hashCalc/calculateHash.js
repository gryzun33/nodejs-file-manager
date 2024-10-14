import { createHash } from 'crypto';
import path from 'path';
import fs from 'fs';

function calculateHash(pathToFile) {
  return new Promise((resolve) => {
    const resultPath = path.resolve(process.cwd(), pathToFile);
    const hash = createHash('sha256');
    const stream = fs.createReadStream(resultPath);

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const result = hash.digest('hex');
      console.log(`Hash: ${result}`);
      resolve();
    });

    stream.on('error', () => {
      console.error('Operation failed');
      resolve();
    });
  });
}

export { calculateHash };
