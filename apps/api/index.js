const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

const filePath = path.join(__dirname, 'user-mock-data.json');
const filePathBonus = path.join(__dirname, 'bonuses-mock-data.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
function readBonuses() {
  return JSON.parse(fs.readFileSync(filePathBonus, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

app.get('/user/:username', (req, res) => {
  const { username } = req.params;
  const users = readUsers();

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
});

app.get('/bonuses', (req, res) => {
  const bonuses = readBonuses();
  res.json(bonuses);
});


app.post('/user', (req, res) => {
  const updatedUser = req.body;

  if (!updatedUser.username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const users = readUsers();
  const index = users.findIndex(u => u.username === updatedUser.username);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[index] = updatedUser;
  writeUsers(users);

  res.json({ success: true, updatedUser });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});