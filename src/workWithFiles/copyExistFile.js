import path from 'path';
import fs from 'fs';

async function copyExistFile(oldPath, newPath) {
  const fileName = path.basename(oldPath);
  const { name, ext } = path.parse(oldPath);
  const pathToOldFile = path.resolve(process.cwd(), oldPath);
  const pathToNewDirectory = path.resolve(process.cwd(), newPath);
  let pathToNewFile = path.join(pathToNewDirectory, fileName);

  if (pathToOldFile === pathToNewFile) {
    pathToNewFile = path.join(pathToNewDirectory, `${name}_copy${ext}`);
  }

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
        console.error('Operation failed');
        errorHandled = true;
        resolve();
      }
    };

    readStream.on('error', handleError);
    writeStream.on('error', handleError);
  });
}

export { copyExistFile };
