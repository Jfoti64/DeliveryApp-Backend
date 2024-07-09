import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import RateLimit from 'express-rate-limit';
// import MongoStore from 'connect-mongo';

// Load environment variables
dotenv.config();

// Import configurations and routes after dotenv.config()
import itemRoutes from './routes/itemRoutes.js';

const app = express();

// Trust the first proxy
app.set('trust proxy', 1);

// Rate limiter: maximum of 1000 requests per minute for development
// if (process.env.NODE_ENV !== 'test') {
//   const limiter = RateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minute
//     max: process.env.NODE_ENV === 'development' ? 2000 : 1000,
//   });
//   app.use(limiter);
// }

// app.use(compression());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL.trim().replace(/\/$/, ''),
  credentials: true,
};
app.use(cors(corsOptions));

// Helmet configuration
// app.use(helmet());

// Routes
app.use('/items', itemRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to SocialNet API');
});

// Test CORS route
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));
}

export default app;
