import path from 'path';
import fs from 'fs';

async function copyExistFile(oldPath, newPath) {
  const fileName = path.basename(oldPath);
  const pathToOldFile = path.resolve(process.cwd(), oldPath);
  const pathToNewDirectory = path.resolve(process.cwd(), newPath);
  const pathToNewFile = path.join(pathToNewDirectory, fileName);

  return new Promise((resolve) => {
    const readStream = fs.createReadStream(pathToOldFile);
    const writeStream = fs.createWriteStream(pathToNewFile);
    readStream.pipe(writeStream);

    readStream.on('end', () => {
      resolve();
    });

    let errorHandled = false;

    const handleError = () => {
      if (!errorHandled) {
        console.error('Operation failed 1');
        errorHandled = true;
        resolve();
      }
    };

    readStream.on('error', handleError);
    writeStream.on('error', handleError);
  });
}

export { copyExistFile };
