import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


// Load environment variables
dotenv.config();
import { userRouter } from './routes/userRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { studentRouter } from './routes/studentRoutes.js';
import { paymentRouter } from './routes/paymentRoutes.js';
import { expenseRouter } from './routes/expenseRoutes.js';
import { seatRouter } from './routes/seatRoutes.js';
import { alertRouter } from './routes/alertRoutes.js';
import { dashboardRouter } from './routes/dashboardRoutes.js';
import { connectDB } from './config/database.js';
import { authRouter } from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin : 'http://localhost:5173',
  credentials : true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes (public)
app.use('/api/auth', authRouter );

// Protected routes
app.use('/api/user', userRouter );
app.use('/api/admin', adminRouter );
app.use('/api/students',  studentRouter);
app.use('/api/payments',  paymentRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/seats', seatRouter);
app.use('/api/alerts',  alertRouter);
app.use('/api/dashboard', dashboardRouter );

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
