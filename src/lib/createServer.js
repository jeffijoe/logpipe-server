import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import KoaRouter from 'koa-router';
import logApi from '../api/logs';
import responseCalls from '../middleware/responseCalls';

/**
 * Creates a logpipe server.
 *
 * @param  {Number} opts.port
 * The port to start the server on.
 *
 * @return {Promise}
 */
export default async function createServer(opts) {
  const app = new Koa();
  const router = new KoaRouter();

  app.use(convert(bodyParser()));
  app.use(responseCalls);

  // Create log API.
  logApi(router);

  // Router.
  app.use(router.allowedMethods());
  app.use(router.routes());

  // Last middleware handles not-found.
  app.use((ctx) => {
    ctx.notFound({ message: 'Not found.' });
  });

  app.listen(opts.port);
}