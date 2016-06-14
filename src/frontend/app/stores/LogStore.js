import { observable, computed, action } from 'mobx';
import LogEntry from '../domain/LogEntry';
import sample from 'lodash/sample';
import autobind from 'autobind-decorator';

function getRandomLog() {
  return sample([{
    lvl: 'error',
    msg: 'A serious error occured, bro..',
    data: {
      message: 'some error',
      stack: ['at some/file.js:123']
    }
  }, {
    lvl: 'warn',
    msg: 'Not that serious..'
  }, {
    lvl: 'info',
    msg: 'Just a heads up here!'
  }]);
}

@autobind
class LogStore {
  @observable logs = [];
  @observable logBuffer = [];

  @observable isBuffering = false;

  /**
   * Constructor
   */
  constructor({socket}) {
    this.socket = socket;
    this.socket.on(
      'newLog',
      this.newLog.bind(this)
    );
    this.socket.on(
      'clearLogs',
      this.onLogsCleared.bind(this)
    );

    this.fetchLogs();
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

  @action newLog(newLog) {
    (this.isBuffering ? this.logBuffer : this.logs).unshift(new LogEntry({...newLog }));
  }

  @action toggleBuffering() {
    this.isBuffering = !this.isBuffering;
    if (!this.isBuffering) {
      this.flushLogBuffer();
    }
  }

  @action flushLogBuffer() {
    this.logs.unshift(...this.logBuffer.slice());
    this.logBuffer.replace([]);
  }

  @action onLogsCleared() {
    this.logs = [];
    this.logBuffer = [];
  }
}

export default new LogStore({socket: window.socket});