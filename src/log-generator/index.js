const axios = require('axios');
const random = require('random');

const getRandomLog = () => {
  return {
    lvl: 'info',
    message: 'shit waddup'
  };
};

const run = async () => {
  setTimeout(run, random(200, 5000));
  await axios.post('http://localhost:4321/api/logs', getRandomLog());
};

run();