import { extendObservable } from 'mobx';

let __id = 1;

class LogsStore {
  /**
   * Constructor
   */
  constructor({socket}) {
    this.socket = socket;
    extendObservable(this, {
      logs: [{
        id: __id,
        msg: 'Hello, this is a test log',
        lvl: 'info',
        ts: 1460054195803
      }]
    });

    this.socket.on(
      'newLog',
      newLog => this.logs.unshift({...newLog, id: __id++ })
    );
  }
}

export default new LogsStore({socket: window.socket});