import os from 'os';

function startFileManager() {
  const args = process.argv.slice(2);
  const argUser = args.find((arg) => arg.startsWith('--username='));
  let userName = '';
  if (argUser) {
    userName = argUser.split('=')[1];
    process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
  }

  process.stdin.on('data', (input) => {
    const cmd = input.toString().trim();

    switch (cmd) {
      case '.exit':
        process.exit(0);
      default:
        process.stdout.write(`Unknown command${os.EOL}`);
    }
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

startFileManager();
