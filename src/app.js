const express = require('express');

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

let nextId = 3;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Users API</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { max-width: 700px; width: 100%; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 700; background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
    .subtitle { color: #64748b; margin-bottom: 2.5rem; font-size: 1rem; }
    .badge { display: inline-block; background: #22c55e22; color: #22c55e; border: 1px solid #22c55e44; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; margin-bottom: 2rem; }
    .endpoints { display: flex; flex-direction: column; gap: 0.75rem; }
    .endpoint { display: flex; align-items: center; gap: 1rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1rem 1.25rem; transition: border-color 0.2s; }
    .endpoint:hover { border-color: #6366f1; }
    .method { font-size: 0.7rem; font-weight: 700; padding: 0.3rem 0.6rem; border-radius: 0.4rem; min-width: 60px; text-align: center; }
    .get  { background: #0ea5e922; color: #0ea5e9; }
    .post { background: #22c55e22; color: #22c55e; }
    .del  { background: #ef444422; color: #ef4444; }
    .path { font-family: monospace; font-size: 0.95rem; color: #c4b5fd; }
    .desc { color: #64748b; font-size: 0.85rem; margin-left: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Users API</h1>
    <p class="subtitle">Simple REST API built with Express.js</p>
    <span class="badge">● Online</span>
    <div class="endpoints">
      <div class="endpoint"><span class="method get">GET</span><span class="path">/health</span><span class="desc">Health check</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="path">/users</span><span class="desc">Get all users</span></div>
      <div class="endpoint"><span class="method get">GET</span><span class="path">/users/:id</span><span class="desc">Get user by ID</span></div>
      <div class="endpoint"><span class="method post">POST</span><span class="path">/users</span><span class="desc">Create user</span></div>
      <div class="endpoint"><span class="method del">DELETE</span><span class="path">/users/:id</span><span class="desc">Delete user</span></div>
    </div>
  </div>
</body>
</html>`);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (!email) return res.status(400).json({ error: 'Email is required' });
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
});

module.exports = app;
