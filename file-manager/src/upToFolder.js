import path from 'path';

function upToFolder(currentPath) {
  // throw new Error();
  const newPath = path.dirname(currentPath);
  const rootPath = path.parse(currentPath).root;
  if (path.resolve(currentPath) === path.resolve(rootPath)) {
    return currentPath;
  } else {
    return newPath;
  }
}

export { upToFolder };
