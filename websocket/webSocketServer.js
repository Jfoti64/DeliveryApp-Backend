// webSocketServer.js
import { WebSocketServer } from 'ws';
import polyline from '@mapbox/polyline';
import dotenv from 'dotenv';
import eventEmitter from '../emitters/eventEmitter.js';

dotenv.config();

let driverLocation = { lat: 25.7291361, lng: -80.4282602 }; // Initial driver location
let polylinePoints = []; // Store polyline points

const startWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    if (polylinePoints.length > 0) {
      startDriverSimulation(ws);
    } else {
      ws.send(JSON.stringify({ error: 'No directions available yet' }));
    }

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return wss;
};

// Listen for directions event
eventEmitter.on('directions', ({ data }) => {
  try {
    const steps = data.routes[0].legs[0].steps;
    polylinePoints = steps.flatMap((step) =>
      polyline.decode(step.polyline.points).map(([lat, lng]) => ({ lat, lng }))
    );
    console.log('Polyline initialized with new directions');
  } catch (error) {
    console.error('Error decoding polyline points:', error);
  }
});

const startDriverSimulation = (ws) => {
  let stepIndex = 0;

  const sendDriverLocation = () => {
    if (stepIndex < polylinePoints.length) {
      driverLocation = polylinePoints[stepIndex];
      ws.send(JSON.stringify(driverLocation));
      stepIndex++;
    } else {
      clearInterval(updateInterval);
    }
  };

  const updateInterval = setInterval(sendDriverLocation, 1000); // Update location every second

  ws.on('close', () => {
    clearInterval(updateInterval);
  });
};

export default startWebSocketServer;
