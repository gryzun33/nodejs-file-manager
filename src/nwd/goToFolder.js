import path from 'path';

function goToFolder(newDir) {
  // throw new Error();
  const newPath = path.resolve(process.cwd(), newDir);
  process.chdir(newPath);
}

export { goToFolder };
