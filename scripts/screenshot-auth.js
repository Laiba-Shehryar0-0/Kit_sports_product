/**
 * Injects a fake logged-in user into localStorage, then opens the page
 * so Chrome can screenshot the logged-in navbar state.
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');

// We serve a tiny redirect page that sets localStorage then bounces to localhost:5173
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html>
<html>
<head>
  <script>
    // Register a user
    const users = [{ id: 1, name: "Ahmed Khan", email: "ahmed@example.com", password: "test123", avatar: "A" }];
    localStorage.setItem('kws_users', JSON.stringify(users));
    // Log them in
    const { password, ...safe } = users[0];
    localStorage.setItem('kws_user', JSON.stringify(safe));
    // Bounce to app
    window.location.href = 'http://localhost:5173/';
  </script>
</head>
<body>Redirecting...</body>
</html>`);
});

server.listen(9191, () => {
  console.log('Auth injector server on http://localhost:9191');
  server.close();
});
