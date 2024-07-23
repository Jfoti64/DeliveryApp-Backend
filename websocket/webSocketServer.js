import { WebSocketServer } from 'ws';
import polyline from '@mapbox/polyline';
import dotenv from 'dotenv';
import { getDirections } from '../controllers/directionsController.js';

dotenv.config();

let driverLocation = { lat: 25.7291361, lng: -80.4282602 }; // Initial driver location
let polylinePoints = []; // Store polyline points

const startWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', async (ws) => {
    console.log('Client connected');

    try {
      await initializePolyline();
      startDriverSimulation(ws);
    } catch (error) {
      console.error('Error during WebSocket connection:', error);
      ws.send(JSON.stringify({ error: 'Failed to initialize driver simulation' }));
    }

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return wss;
};

const initializePolyline = async () => {
  const origin = `${driverLocation.lat},${driverLocation.lng}`;
  const destination = '25.7220991,-80.4433866'; // Example destination

  try {
    const { data } = await getDirections({ query: { origin, destination } });
    const steps = data.routes[0].legs[0].steps;
    polylinePoints = steps.flatMap((step) =>
      polyline.decode(step.polyline.points).map(([lat, lng]) => ({ lat, lng }))
    );
  } catch (error) {
    throw new Error('Error getting directions: ' + error.message);
  }
};

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
