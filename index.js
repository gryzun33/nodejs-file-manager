import os from 'os';
import readline from 'readline';
import { upToFolder } from './src/upToFolder.js';
import { goToFolder } from './src/goToFolder.js';
import { printList } from './src/printList.js';

const commands = {
  '.exit': {
    fn: () => rl.close(),
    numbArgs: 0,
  },
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
    fn: (args) => readFileContent(args[0]),
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
    fn: (args) => copyFile(args[0], args[1]),
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
};

function startFileManager() {
  let currentPath = os.homedir();
  process.chdir(currentPath);

  const args = process.argv.slice(2);
  const argUser = args.find((arg) => arg.startsWith('--username='));
  let userName = '';

  if (argUser) {
    userName = argUser.split('=')[1];
    process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
    process.stdout.write(`You are currently in ${process.cwd()}${os.EOL}`);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    const [cmd, ...args] = input.trim().split(' ');

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
