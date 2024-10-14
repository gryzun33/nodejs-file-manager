import path from 'path';

function goToFolder(newDir) {
  try {
    const newPath = path.resolve(process.cwd(), newDir);
    process.chdir(newPath);
  } catch {
    console.error('Operation failed');
  }
}

export { goToFolder };
