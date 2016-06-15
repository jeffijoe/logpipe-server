import createServer from '../lib/createServer';
import chalk from 'chalk';
import getopt from 'node-getopt';
import safeNumber from '../util/safeNumber';

const DEFAULT_PORT = 4321;
const parser = getopt.create([
  ['', 'port[=PORT]', `Server port. Default is ${DEFAULT_PORT}`],
  ['h', 'help', 'Display this help'],
  ['v', 'version', 'Display server version']
]);

parser.setHelp(
  'Usage: logpipe\n\n' +
  '[[OPTIONS]]'
);

(async function main() {
  const {options} = parser.parseSystem();
  if (options.help) {
    parser.showHelp();
    return;
  }

  options.port = safeNumber(options.port, DEFAULT_PORT);

  try {
    await createServer({
      port: options.port || DEFAULT_PORT
    });
    console.log(chalk.yellow(' ->'), chalk.green(`Logpipe Server v${__VERSION__}`), chalk.white('started on port'), chalk.blue(options.port));
  } catch (err) {
    console.error('Could not start Logpipe server:');
    console.error(err);
  }
}());