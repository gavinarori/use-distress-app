// /types/next.d.ts

import { Server as HTTPServer } from 'http';
import { WebSocketServer } from 'ws';
import { NextApiResponse } from 'next';

declare module 'next' {
  interface NextApiResponse<T = any> {
    socket: {
      server: HTTPServer & {
        wss?: WebSocketServer;
      };
    };
    setHeader(name: string, value: string | string[]): this;
    status(code: number): this;
    end(): void;
  }
}
