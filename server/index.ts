console.log('Starting server initialization...');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';

import { initializeSchema } from './db/schema';
import { seedData } from './db/seed';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import authRoutes from './routes/auth';
import flatsRoutes from './routes/flats';
import billsRoutes from './routes/bills';
import tenantsRoutes from './routes/tenants';
import complaintsRoutes from './routes/complaints';
import visitorsRoutes from './routes/visitors';
import amenitiesRoutes from './routes/amenities';
import votingRoutes from './routes/voting';
import documentsRoutes from './routes/documents';
import vendorsRoutes from './routes/vendors';
import utilitiesRoutes from './routes/utilities';
import clearancesRoutes from './routes/clearances';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Database
try {
  initializeSchema();
  seedData();
  console.log('Database initialized successfully');
} catch (error) {
  console.error('Failed to initialize database', error);
  process.exit(1);
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/flats', flatsRoutes);
app.use('/api/bills', billsRoutes);
app.use('/api/tenants', tenantsRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/visitors', visitorsRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/voting', votingRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/vendors', vendorsRoutes);
app.use('/api/utilities', utilitiesRoutes);
app.use('/api/clearances', clearancesRoutes);

// Static file serving for production frontend
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error Handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SocietyConnect API Server running on http://localhost:${PORT}`);
});
