import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import organizerRouter from './routes/organizerRouter';
import studentRouter from './routes/studentRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Main routers
app.use('/api/organizer', organizerRouter);
app.use('/api/student', studentRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', roleSystem: 'Active' });
});

app.listen(PORT, () => {
  console.log(`🚀 Express Backend running on http://localhost:${PORT}`);
});
