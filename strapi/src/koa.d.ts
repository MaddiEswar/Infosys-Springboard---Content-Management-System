// ./src/koa.d.ts

import { Request } from 'koa';

declare module 'koa' {
  interface Request {
    body: any;
  }
}
