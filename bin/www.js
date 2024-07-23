#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import http from 'http';
import app from '../server.js';
import startWebSocketServer from '../websocket/webSocketServer.js';

const debug = debugLib('deliveryapp-backend:server'); // Updated the debug namespace to match your project name

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Initialize WebSocket server.
 */
startWebSocketServer(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log(`Server is listening on ${bind}`);
}

/**
 * Graceful shutdown
 */
function shutdown() {
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forcefully shutting down');
    process.exit(1);
  }, 10000); // Wait for 10 seconds to close all connections
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
