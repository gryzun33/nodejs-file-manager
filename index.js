import os from 'os';
import readline from 'readline';
import { upToFolder } from './src/nwd/upToFolder.js';
import { goToFolder } from './src/nwd/goToFolder.js';
import { printList } from './src/nwd/printList.js';
import { readFileContent } from './src/workWithFiles/readFileContent.js';
import { createFile } from './src/workWithFiles/createFile.js';
import { renameFile } from './src/workWithFiles/renameFile.js';
import { copyExistFile } from './src/workWithFiles/copyExistFile.js';
import { moveFile } from './src/workWithFiles/moveFile.js';
import { removeFile } from './src/workWithFiles/removeFile.js';
import { getOSInfo } from './src/osInfo/getOSInfo.js';
import { calculateHash } from './src/hashCalc/calculateHash.js';
import { compressFile } from './src/compression/compressFile.js';
import { decompressFile } from './src/compression/decompressFile.js';

const commands = {
  up: {
    fn: () => upToFolder(),
    numbArgs: 0,
  },
  cd: {
    fn: (args) => goToFolder(args[0]),
    numbArgs: 1,
  },
  ls: {
    fn: async () => await printList(),
    numbArgs: 0,
  },
  cat: {
    fn: async (args) => await readFileContent(args[0]),
    numbArgs: 1,
  },
  add: {
    fn: (args) => createFile(args[0]),
    numbArgs: 1,
  },
  rn: {
    fn: (args) => renameFile(args[0], args[1]),
    numbArgs: 2,
  },
  cp: {
    fn: (args) => copyExistFile(args[0], args[1]),
    numbArgs: 2,
  },
  mv: {
    fn: (args) => moveFile(args[0], args[1]),
    numbArgs: 2,
  },
  rm: {
    fn: (args) => removeFile(args[0]),
    numbArgs: 1,
  },
  os: {
    fn: (args) => getOSInfo(args[0]),
    numbArgs: 1,
  },
  hash: {
    fn: (args) => calculateHash(args[0]),
    numbArgs: 1,
  },
  compress: {
    fn: (args) => compressFile(args[0], args[1]),
    numbArgs: 2,
  },
  decompress: {
    fn: (args) => decompressFile(args[0], args[1]),
    numbArgs: 2,
  },
};

function startFileManager() {
  let currentPath = os.homedir();
  process.chdir(currentPath);

  const args = process.argv.slice(2);

  const argUser = args.find((arg) => arg.startsWith('--username='));

  const userName = argUser ? argUser.split('=')[1] : 'Guest';

  process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
  process.stdout.write(`You are currently in ${process.cwd()}${os.EOL}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (data) => {
    const input = data.trim();
    const indFirstSpace = input.indexOf(' ');
    const cmd =
      indFirstSpace === -1
        ? input.trim()
        : input.slice(0, indFirstSpace).trim();
    const restOfInput =
      indFirstSpace === -1 ? '' : input.slice(indFirstSpace).trim();

    const args =
      restOfInput.length > 0
        ? restOfInput
            .match(/(?:[^\s'""]+|"[^"]*"|'[^']*')+/g)
            .map((arg) => arg.replace(/^["']|["']$/g, ''))
        : [];

    if (cmd === '.exit') {
      rl.close();
    }

    if (commands[cmd]) {
      const command = commands[cmd];

      if (args.length !== command.numbArgs) {
        process.stdout.write(`Invalid input${os.EOL}`);
      } else {
        await command.fn(args);
      }
    } else {
      process.stdout.write(`Invalid input${os.EOL}`);
    }

    process.stdout.write(`You are currently in ${process.cwd()}${os.EOL}`);
  });

  rl.on('close', () => {
    process.stdout.write(
      `Thank you for using File Manager, ${userName}, goodbye!${os.EOL}`
    );
    process.exit(0);
  });
}

startFileManager();
