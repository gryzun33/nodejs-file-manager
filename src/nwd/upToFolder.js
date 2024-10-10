import path from 'path';

function upToFolder() {
  // throw new Error();
  const currentPath = process.cwd();
  const newPath = path.dirname(currentPath);
  const rootPath = path.parse(currentPath).root;
  if (path.resolve(currentPath) === path.resolve(rootPath)) {
    return;
  } else {
    process.chdir(newPath);
  }
}

export { upToFolder };
