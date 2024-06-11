const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/poetryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const poemSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Poem = mongoose.model('Poem', poemSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/poems', async (req, res) => {
  const poem = new Poem(req.body);
  await poem.save();
  res.send(poem);
});

app.get('/api/poems', async (req, res) => {
  const poems = await Poem.find();
  res.send(poems);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
