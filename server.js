// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Express app
const app = express();
app.use(express.json());

// Get directory name from URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to data file
const dataFilePath = path.join(__dirname, 'data.json');

// Initialize pet data if file does not exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({ pet: null, mood: 'happy', health: 100 }));
}

// Create a new pet
app.post('/pets', (req, res) => {
  const { name, type, color } = req.body;
  const petData = { name, type, color, mood: 'happy', health: 100 };
  fs.writeFileSync(dataFilePath, JSON.stringify({ pet: petData, mood: 'happy', health: 100 }));
  res.status(201).send({ message: 'Pet created successfully', pet: petData });
});

// Feed the pet
app.post('/feed', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  data.health = Math.min(100, data.health + 10);
  data.mood = 'happy';
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
  res.send({ message: 'Pet fed successfully', status: data });
});

// Play with the pet
app.post('/play', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  data.health = Math.min(100, data.health + 5);
  data.mood = 'excited';
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
  res.send({ message: 'Played with the pet successfully', status: data });
});

// Train the pet
app.post('/train', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  data.health = Math.max(0, data.health - 5);
  data.mood = 'tired';
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
  res.send({ message: 'Pet trained successfully', status: data });
});

// Check pet's status
app.get('/status', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
