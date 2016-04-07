import createServer from '../lib/createServer';

const PORT = 4321;

createServer({
  port: PORT
}).then(() => {
  console.info('Logpipe Server started on port', PORT);
}, err => {
  console.error('Could not start Logpipe:');
  console.error(err);
});