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
};

function startFileManager() {
  let currentPath = os.homedir();
  process.chdir(currentPath);
  // console.log('текущая директория:', process.cwd());
  const args = process.argv.slice(2);
  const argUser = args.find((arg) => arg.startsWith('--username='));
  let userName = '';

  if (argUser) {
    userName = argUser.split('=')[1];
    process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
    process.stdout.write(`You are currently in ${process.cwd()}${os.EOL}`);
    // printCurrentPath(currentPath);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    const [cmd, ...args] = input.trim().split(' ');
    // const cmd = input.trim();

    // rl.prompt();

    // switch (cmd) {
    //   case '.exit':
    //     rl.close();
    //     break;
    //   case 'up':
    //     upToFolder();
    //     break;
    //   case 'cd':
    //     if (args.length === 0) {
    //       break;
    //     }
    //     const dir = args.join(' ');
    //     goToFolder(dir);
    //     break;
    //   case 'ls':
    //     await printList();
    //     break;
    //   default:
    //     process.stdout.write(`Invalid input${os.EOL}`);
    //     break;
    // }

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

    // rl.prompt();
  });

  rl.on('close', () => {
    process.stdout.write(
      `Thank you for using File Manager, ${userName}, goodbye!${os.EOL}`
    );
    process.exit(0);
  });
}

// function printCurrentPath(path) {
//   process.stdout.write(`You are currently in ${path}${os.EOL}`);
// }

startFileManager();
