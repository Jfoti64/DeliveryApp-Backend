// controllers/directionsController.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getDirections = async (req, res) => {
  const { origin, destination, mode = 'bicycling' } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin,
        destination,
        mode,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      res.json(response.data);
    } else {
      res.status(500).json({ error: response.data.error_message || 'Failed to fetch directions' });
    }
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
};
