# Security Lab - Aplikasi Pembelajaran Keamanan Web

Aplikasi pembelajaran interaktif untuk memahami kerentanan keamanan web yang umum, yaitu SQL Injection dan Cross-Site Scripting (XSS).

## Fitur Aplikasi

### 1. SQL Injection Demo (Halaman Login)
**Kerentanan**: Query database menggunakan string concatenation tanpa parameterization
**Endpoint**: `/api/login`
**Method**: POST

**Contoh Payload:**
```
Email: admin@example.com' OR '1'='1
Password: (apa saja)
```

**Penjelasan:**
- Aplikasi menggunakan query: `SELECT * FROM users WHERE email = '{email}' AND password = '{password}'`
- Ketika diisi dengan `admin@example.com' OR '1'='1`, query menjadi:
  ```sql
  SELECT * FROM users WHERE email = 'admin@example.com' OR '1'='1' AND password = '...'
  ```
- Kondisi `OR '1'='1'` selalu bernilai true, sehingga login berhasil tanpa password yang benar

**Akun Demo:**
- Email: `admin@example.com`
- Password: `password123`

### 2. XSS Reflected Demo (Halaman Search)
**Kerentanan**: Menampilkan parameter query tanpa encoding/sanitasi HTML
**Endpoint**: `/api/search?q=...`
**Method**: GET

**Contoh Payload:**
```
?q=<script>alert('XSS Attack')</script>
?q=<img src=x onerror="alert('XSS')">
?q=<svg/onload=alert('XSS')>
```

**Penjelasan:**
- Parameter `q` ditampilkan langsung ke halaman HTML tanpa encoding
- Browser akan menginterpretasi tag HTML dan menjalankan script
- Serangan XSS bisa mengakses cookies, session, atau melakukan aksi berbahaya lainnya

## Cara Menjalankan

### Development Mode
```bash
npm install
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### Production Mode
```bash
npm run build
npm run start
```

## Struktur Proyek

```
project/
├── server.js              # Express backend dengan kerentanan
├── src/
│   ├── App.tsx           # Main App component
│   ├── pages/
│   │   ├── HomePage.tsx   # Halaman utama dengan penjelasan
│   │   ├── LoginPage.tsx  # Halaman login (SQL Injection)
│   │   └── SearchPage.tsx # Halaman search (XSS)
│   └── main.tsx
```

## Database

Aplikasi menggunakan SQLite in-memory dengan data demo:
- Email: `admin@example.com`, Password: `password123`
- Email: `user@example.com`, Password: `secure456`

## Penting: Disclaimer Edukasi

**APLIKASI INI HANYA UNTUK PEMBELAJARAN DI KELAS**

- Kerentanan yang ada DISENGAJA dibuat untuk tujuan edukatif
- JANGAN gunakan teknik ini untuk mengakses sistem orang lain tanpa izin
- JANGAN deploy aplikasi ini ke server publik
- Selalu gunakan praktik keamanan terbaik dalam aplikasi production

## Pembelajaran dari Kerentanan Ini

### Cara Mencegah SQL Injection:
1. Gunakan prepared statements/parameterized queries
2. Validate dan sanitize input
3. Gunakan ORM yang aman
4. Implementasi least privilege di database
5. Monitor dan log semua database queries

### Cara Mencegah XSS:
1. Encode output HTML (`<` menjadi `&lt;`, dst)
2. Gunakan Content Security Policy (CSP)
3. Sanitize user input
4. Gunakan framework yang auto-escape (React, Vue, dll)
5. Validasi input di server-side

## Referensi

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- SQL Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
