const axios = require('axios');
const random = require('lodash/random');

const err = (error) => JSON.parse(JSON.stringify(error, ['message', 'arguments', 'type', 'name', 'stack']));

const logs = [
  {
    lvl: 'info',
    msg: 'Created user account',
    data: {
      username: 'some-dude'
    }
  },
  {
    lvl: 'debug',
    msg: 'token: asdasd123123asd12'
  },
  {
    lvl: 'error',
    msg: 'An error occured!',
    data: err(new Error('Oh shit'))
  },
  {
    lvl: 'error',
    msg: 'An error occured!',
    data: err(new TypeError('undefined is not undefined. wait wat'))
  },
  {
    lvl: 'warn',
    msg: 'Lots of requests are happening, dude'
  }
];

const getRandomLog = () => {
  return logs[random(0, logs.length-1)];
};

const run = () => {
  setTimeout(run, random(200, 5000));
  const log = getRandomLog();
  return axios.post('http://localhost:4321/api/logs', log).then(response => {
    console.log('log sent', log);
  });
};

run();