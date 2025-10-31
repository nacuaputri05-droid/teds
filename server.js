import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

let db;

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        reject(err);
      } else {
        db.run(`
          CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            password TEXT
          )
        `, (err) => {
          if (err) reject(err);
          else {
            db.run(`
              INSERT INTO users (email, password) VALUES ('admin@example.com', 'password123')
            `, (err) => {
              if (err) reject(err);
              else {
                db.run(`
                  INSERT INTO users (email, password) VALUES ('user@example.com', 'secure456')
                `, (err) => {
                  if (err) reject(err);
                  else resolve();
                });
              }
            });
          }
        });
      }
    });
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email dan password diperlukan' });
  }

  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
    }

    if (row) {
      return res.json({ success: true, message: 'Login berhasil', user: row });
    } else {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }
  });
});

app.get('/api/search', (req, res) => {
  const query = req.query.q || '';

  const results = [
    { id: 1, title: 'Artikel Keamanan', content: 'Penting menjaga password' },
    { id: 2, title: 'Tips Database', content: 'Gunakan prepared statement' },
    { id: 3, title: 'XSS Prevention', content: 'Selalu encode output' }
  ];

  const filtered = results.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.content.toLowerCase().includes(query.toLowerCase())
  );

  const html = `
    <div class="search-results">
      <h2>Hasil pencarian untuk: ${query}</h2>
      ${filtered.length > 0
        ? filtered.map(r => `<div class="result"><h3>${r.title}</h3><p>${r.content}</p></div>`).join('')
        : '<p>Tidak ada hasil ditemukan</p>'
      }
    </div>
  `;

  res.send(html);
});

async function startServer() {
  try {
    await initializeDatabase();

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
      const url = req.originalUrl;
      try {
        let template = await vite.transformIndexHtml(url, `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Security Lab</title>
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="/src/main.tsx"></script>
            </body>
          </html>
        `);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    });

    app.listen(5173, () => {
      console.log('Server berjalan di http://localhost:5173');
    });
  } catch (err) {
    console.error('Gagal memulai server:', err);
    process.exit(1);
  }
}

startServer();
