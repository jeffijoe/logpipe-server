const logs = [];

/**
 * Gets all registered logs.
 */
export function getLogs(ctx) {
  ctx.ok(logs);
}


/**
 * Adds a log entry and broadcasts it to the connected clients.
 */
export function addLog(ctx) {
  // Need to make sure we have a nice format..
  const body = ctx.body;
  const obj = {
    // Message
    msg: body.msg,
    // Timestamp. If not specified, will default to the current time.
    ts: body.ts || Date.now(),
    // Severity level.
    lvl: body.lvl || 'info'
  };

  logs.unshift(ctx.request.body);

  // Avoid overhead by not sending back a body.
  ctx.status = 201;
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
    );
}