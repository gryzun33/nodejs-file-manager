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
    fn: (args) => getOSInfo(args),
    numbArgs: 1,
  },
};

function startFileManager() {
  let currentPath = os.homedir();
  process.chdir(currentPath);

  const args = process.argv.slice(2);
  const argUser = args.find((arg) => arg.startsWith('--username='));
  let userName = 'Anonymous';

  if (argUser) {
    userName = argUser.split('=')[1];
  }

  process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
  process.stdout.write(`You are currently in ${process.cwd()}${os.EOL}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    const [cmd, ...args] = input.trim().split(/\s+/);

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
