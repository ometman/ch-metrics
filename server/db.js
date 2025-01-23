import Database from 'better-sqlite3';

export const db = new Database('training.db');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    location TEXT
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    instructor TEXT,
    duration TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    student_id INTEGER,
    course_id INTEGER,
    enrollment_date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id),
    FOREIGN KEY (course_id) REFERENCES courses (id),
    PRIMARY KEY (student_id, course_id)
  );
`);