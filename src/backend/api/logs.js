import makeLogService from '../services/logService';

/**
 * Makes a Logs API.
 */
export function makeLogsApi({ logService }) {
  /**
   * Gets all registered logs.
   */
  async function getLogs(ctx) {
    const q = ctx.request.query;
    ctx.ok(await logService.getLogs(q));
  }

  /**
   * Clears the logs.
   */
  async function clearLogs(ctx) {
    await logService.clear();
    ctx.ok();
    ctx.io.emit('clearLogs');
  }

  /**
   * Adds a log entry and broadcasts it to the connected clients.
   */
  async function addLog(ctx) {
    // Need to make sure we have a nice format..
    const body = ctx.request.body;
    if (!body) {
      ctx.badRequest('Request contained no body.. This makes me sad.');
      return;
    }

    const obj = await logService.add(body);

    // Avoid overhead by not sending back a body.
    ctx.status = 201;

    // Tell the world!
    ctx.io.emit('newLog', obj);
  }

  return {
    getLogs,
    addLog,
    clearLogs
  };
}


/**
 * Sets up routes.
 */
export default function (router) {
  const logsApi = makeLogsApi({
    logService: makeLogService()
  });
  router
    .get(
      '/api/logs',
      logsApi.getLogs
    )
    .post(
      '/api/logs',
      logsApi.addLog
    )
    .delete(
      '/api/logs',
      logsApi.clearLogs
    );
}