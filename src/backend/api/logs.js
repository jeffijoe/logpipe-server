import takeWhile from 'lodash/takewhile';
import safeNumber from '../util/safeNumber';

let logs = [];

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

/**
 * Gets all registered logs.
 */
export function getLogs(ctx) {
  const q = ctx.request.query;
  const filter = {
    from: q.from ? safeNumber(q.from) : 0,
    to: q.to ? safeNumber(q.to) : 99999999999999,
    q: q.q || ''
  };

  ctx.ok(filterLogs(filter, logs));
}

/**
 * Clears the logs.
 */
export function clearLogs(ctx) {
  logs = [];
  ctx.ok();
  ctx.io.emit('clearLogs');
}

/**
 * Adds a log entry and broadcasts it to the connected clients.
 */
export function addLog(ctx) {
  // Need to make sure we have a nice format..
  const body = ctx.request.body;
  if (!body) {
    ctx.badRequest('Request contained no body.. This makes me sad.');
    return;
  }

  const obj = {
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

  // Avoid overhead by not sending back a body.
  ctx.status = 201;

  // Tell the world!
  ctx.io.emit('newLog', obj);
}


/**
 * Sets up routes.
 */
export default function (router) {
  router
    .get(
      '/api/logs',
      getLogs
    )
    .post(
      '/api/logs',
      addLog
    )
    .delete(
      '/api/logs',
      clearLogs
    );
}