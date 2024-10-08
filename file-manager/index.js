import os from 'os';

function startFileManager() {
  const args = process.argv.slice(2);
  const argUser = args.find((arg) => arg.startsWith('--username='));
  if (argUser) {
    const userName = argUser.split('=')[1];
    process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
  }

  process.stdin.on('data', (input) => {
    console.log('something to do with input');
  });
}

startFileManager();
