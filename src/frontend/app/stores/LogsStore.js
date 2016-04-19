import { observable, computed } from 'mobx';

let __id = 1;

class LogsStore {
  @observable logs = [];

  /**
   * Constructor
   */
  constructor({socket}) {
    this.socket = socket;
    this.socket.on(
      'newLog',
      newLog => this.logs.unshift({...newLog, id: __id++ })
    );
    this.socket.on(
      'clearLogs',
      () => { this.logs = []; }
    );

    this.fetchLogs();
  }

  @computed get hasLogs() {
    return this.logs.length > 0;
  }

  fetchLogs() {
    fetch('/api/logs').then(r => r.json()).then(newLogs => {
      this.logs = newLogs;
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