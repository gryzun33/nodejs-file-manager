import path from 'path';
import fs from 'fs';
import os from 'os';

async function readFileContent(file) {
  const pathToFile = path.resolve(process.cwd(), file);

  return new Promise((resolve) => {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = process.stdout;
    readStream.pipe(writeStream);

    readStream.on('end', () => {
      writeStream.write(`${os.EOL}`);
      resolve();
    });

    readStream.on('error', () => {
      console.error('Operation failed');
      resolve();
    });
  });
}

export { readFileContent };
