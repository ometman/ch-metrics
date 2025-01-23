import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/students.js';
import courseRoutes from './routes/courses.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});