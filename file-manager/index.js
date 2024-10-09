import os from 'os';
import { upToFolder } from './src/upToFolder.js';

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

  process.stdin.on('data', (input) => {
    const cmd = input.toString().trim();

    switch (cmd) {
      case '.exit':
        process.exit(0);
      case 'up':
        currentPath = upToFolder(currentPath);
        break;
      default:
        process.stdout.write(`Invalid input${os.EOL}`);
    }

    printCurrentPath(currentPath);
  });

  process.on('exit', () => {
    process.stdout.write(
      `Thank you for using File Manager, ${userName}, goodbye!${os.EOL}`
    );
  });

  process.on('SIGINT', () => {
    console.log('');
    process.exit(0);
  });
}

function printCurrentPath(path) {
  process.stdout.write(`You are currently in ${path}${os.EOL}`);
}

startFileManager();
