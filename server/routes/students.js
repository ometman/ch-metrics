import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const students = db.prepare(`
    SELECT 
      s.*,
      GROUP_CONCAT(c.title) as courses
    FROM students s
    LEFT JOIN enrollments e ON s.id = e.student_id
    LEFT JOIN courses c ON e.course_id = c.id
    GROUP BY s.id
  `).all();
  
  res.json(students.map(student => ({
    ...student,
    courses: student.courses ? student.courses.split(',') : []
  })));
});

router.post('/', (req, res) => {
  const { name, email, phone, location } = req.body;
  try {
    const result = db.prepare(
      'INSERT INTO students (name, email, phone, location) VALUES (?, ?, ?, ?)'
    ).run(name, email, phone, location);
    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, location } = req.body;
  try {
    db.prepare(
      'UPDATE students SET name = ?, email = ?, phone = ?, location = ? WHERE id = ?'
    ).run(name, email, phone, location, id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM enrollments WHERE student_id = ?').run(id);
    db.prepare('DELETE FROM students WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;