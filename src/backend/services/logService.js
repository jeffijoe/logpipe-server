import takeWhile from 'lodash/takewhile';
import safeNumber from '../util/safeNumber';

/**
 * Filters our logs.
 * @param  {object} filter
 * @param  {object[]} logsToFilter
 * @return {object[]}
 */
function filterLogs(filter, logsToFilter) {
  // Applies filter.
  logsToFilter = takeWhile(
    logsToFilter,
    log => (
      log.ts >= filter.from
        && log.ts <= filter.to
    )
  ).filter(log => log.msg.toUpperCase().indexOf(filter.q.toUpperCase()) > -1);

  return logsToFilter;
}

let _idCounter = 1;

/**
 * Creates a log service.
 */
export default function makeLogService() {
  let logs = [];

  /**
   * Gets all logs.
   */
  const getLogs = (q) => {
    const filter = {
      from: q.from ? safeNumber(q.from) : 0,
      to: q.to ? safeNumber(q.to) : 99999999999999,
      q: q.q || ''
    };

    return Promise.resolve(filterLogs(filter, logs));
  };

  /**
   * Adds a new log.
   */
  const add = (body) => {
    const obj = {
      // Give it an ID.
      id: _idCounter++,
      // Message
      msg: body.msg || '',
      // Timestamp. If not specified, will default to the current time.
      ts: body.ts || Date.now(),
      // Severity level.
      lvl: body.lvl || 'info',
      // Extra data.
      data: body.data
    };

    logs.unshift(obj);
    return Promise.resolve(obj);
  };

  /**
   * Clears all logs.
   */
  const clear = () => {
    logs = [];
    return Promise.resolve();
  };

  return {
    getLogs,
    add,
    clear
  };
}