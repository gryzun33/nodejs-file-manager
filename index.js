import os from 'os';
import { upToFolder } from './src/upToFolder.js';
import readline from 'readline';
import { printList } from './src/printList.js';

function startFileManager() {
  let currentPath = os.homedir();
  const args = process.argv.slice(2);
  const argUser = args.find((arg) => arg.startsWith('--username='));
  let userName = '';

  if (argUser) {
    userName = argUser.split('=')[1];
    process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
    printCurrentPath(currentPath);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    const cmd = input.trim();

    // rl.prompt();

    switch (cmd) {
      case '.exit':
        rl.close();
        break;
      case 'up':
        currentPath = upToFolder(currentPath);
        break;
      case 'ls':
        await printList(currentPath);
        break;
      default:
        process.stdout.write(`Invalid input${os.EOL}`);
        break;
    }

    printCurrentPath(currentPath);

    // rl.prompt();
  });

  rl.on('close', () => {
    process.stdout.write(
      `Thank you for using File Manager, ${userName}, goodbye!${os.EOL}`
    );
    process.exit(0);
  });
}

function printCurrentPath(path) {
  process.stdout.write(`You are currently in ${path}${os.EOL}`);
}

startFileManager();
