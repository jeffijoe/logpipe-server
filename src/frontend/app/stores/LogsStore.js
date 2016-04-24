import { observable, computed } from 'mobx';
import LogEntry from '../domain/LogEntry';
import sample from 'lodash/sample';

function getRandomLog() {
  return sample([{
    lvl: 'error',
    msg: 'A serious error occured, bro..'
  }, {
    lvl: 'warn',
    msg: 'Not that serious..'
  }, {
    lvl: 'info',
    msg: 'Just a heads up here!'
  }]);
}

class LogsStore {
  @observable logs = [];

  /**
   * Constructor
   */
  constructor({socket}) {
    this.socket = socket;
    this.socket.on(
      'newLog',
      newLog => this.logs.unshift(new LogEntry({...newLog }))
    );
    this.socket.on(
      'clearLogs',
      () => { this.logs = []; }
    );

    this.fetchLogs();

    setInterval(() => {
      this.sendTestLog(getRandomLog());
    }, 1000);
  }

  @computed get hasLogs() {
    return this.logs.length > 0;
  }

  fetchLogs() {
    fetch('/api/logs').then(r => r.json()).then(newLogs => {
      this.logs = newLogs.map(x => new LogEntry(x));
    });
  }

  sendTestLog(obj) {
    return fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
  }

  clearLogs() {
    return fetch('/api/logs', {
      method: 'DELETE'
    });
  }
}

export default new LogsStore({socket: window.socket});