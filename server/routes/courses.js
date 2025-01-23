import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const courses = db.prepare(`
    SELECT 
      c.*,
      COUNT(DISTINCT e.student_id) as students
    FROM courses c
    LEFT JOIN enrollments e ON c.id = e.course_id
    GROUP BY c.id
  `).all();
  res.json(courses);
});

router.post('/', (req, res) => {
  const { title, description, instructor, duration, image_url } = req.body;
  try {
    const result = db.prepare(
      'INSERT INTO courses (title, description, instructor, duration, image_url) VALUES (?, ?, ?, ?, ?)'
    ).run(title, description, instructor, duration, image_url);
    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, instructor, duration, image_url } = req.body;
  try {
    db.prepare(
      'UPDATE courses SET title = ?, description = ?, instructor = ?, duration = ?, image_url = ? WHERE id = ?'
    ).run(title, description, instructor, duration, image_url, id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM enrollments WHERE course_id = ?').run(id);
    db.prepare('DELETE FROM courses WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;