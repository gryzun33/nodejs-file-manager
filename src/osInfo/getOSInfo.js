import os from 'os';

function getOSInfo(arg) {
  switch (arg) {
    case '--EOL':
      console.log(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Overall amount of CPUS: ${cpus.length}`);

      const cpuInfo = cpus.map((cpu) => ({
        Model: cpu.model,
        Clock_Rate: `${(cpu.speed / 1000).toFixed(2)} GHz`,
      }));

      console.table(cpuInfo);
      break;
    case '--homedir':
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case '--username':
      console.log(`System user name: ${os.userInfo().username}`);
      break;
    case '--architecture':
      console.log(`CPU architecture: ${os.arch()}`);
      break;
    default:
      console.log(`Invalid input`);
      break;
  }
}

export { getOSInfo };
