import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import serve from 'koa-static';
import KoaRouter from 'koa-router';
import logApi from '../api/logs';
import responseCalls from '../middleware/responseCalls';
import http from 'http';
import IO from 'socket.io';
import indexView from '../views/index';

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
  const io = IO();

  // Set by babel-plugin-defines
  if (global.PRODUCTION) {
    app.use(convert(serve(path.join(__dirname, '../public'))));
  } else {
    const devServer = require('../middleware/webpackDevServer').default;
    devServer(app);
  }

  app.use(convert(bodyParser()));
  app.use(responseCalls);

  // Provide the context with the io object.
  app.use((ctx, next) => {
    ctx.io = io;
    return next();
  });

  // Create log API.
  logApi(router);

  // Router.
  app.use(router.allowedMethods());
  app.use(router.routes());

  // Last middleware returns the index.html if it's a GET.
  app.use((ctx) => {
    if (ctx.method === 'GET') {
      ctx.response.set('content-type', 'text/html');
      ctx.body = indexView();
      return;
    }

    ctx.notFound({ message: 'Not found.' });
  });

  const server = http.createServer(app.callback());
  io.attach(server);
  await new Promise((resolve, reject) => {
    try {
      server.listen(
        opts.port,
        (err) => err ? reject(err) : resolve(server)
      );
    } catch (err) {
      reject(err);
    }
  });
}