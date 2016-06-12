import moment from 'moment';
import { observable, computed } from 'mobx';

/**
 * Log entry.
 */
export default class LogEntry {
  @observable message;
  @observable level;
  @observable timestamp;
  @observable data;
  @observable expanded = false;

  /**
   * Constructor.
   */
  constructor(attrs) {
    Object.assign(this, {
      id: attrs.id,
      message: attrs.msg,
      level: attrs.lvl,
      timestamp: moment(attrs.ts),
      data: attrs.data
    });
  }

  toggleDetails() {
    this.expanded = !this.expanded;
  }
}