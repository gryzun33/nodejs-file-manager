import fs from 'fs/promises';

async function printList() {
  const currPath = process.cwd();
  const data = await fs.readdir(currPath, { withFileTypes: true });

  const resultData = [];

  const directories = data
    .filter((elem) => elem.isDirectory())
    .map((elem) => elem.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map((elem) => ({
      Name: elem,
      type: 'directory',
    }));

  const files = data
    .filter((elem) => elem.isFile())
    .map((elem) => elem.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map((elem) => ({
      Name: elem,
      type: 'file',
    }));

  resultData.push(...directories, ...files);
  console.table(resultData);
}

export { printList };
