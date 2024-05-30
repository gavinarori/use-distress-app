
import { WebSocketServer, WebSocket } from 'ws';
import { prisma } from '@/lib/prisma';

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  // Send initial locations data when a new client connects
  sendLocations(ws);

  // Handle incoming messages from the client
  ws.on('message', (message: string) => {
    console.log('received: %s', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const sendLocations = async (ws: WebSocket) => {
  const locations = await prisma.location.findMany();
  ws.send(JSON.stringify({ getCurrentLocation: locations }));
};

export { wss, sendLocations };
