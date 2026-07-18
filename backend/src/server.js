const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Crop = require('./models/Crop');
const sampleCrops = require('./data/sampleCrops');
const { router: cropRouter, setMemoryMode, setInitialMemoryData } = require('./routes/crops');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pasumai_pettagam';

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/assets', express.static(path.resolve(__dirname, '../../assets')));
app.use('/', express.static(path.resolve(__dirname, '../../frontend')));

app.get('/api/health', (_, res) => {
  res.json({ message: 'Pasumai Pettagam API is running' });
});

app.use('/api/crops', cropRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error' });
});

async function seedMongoData() {
  const count = await Crop.countDocuments();
  if (count === 0) {
    await Crop.insertMany(sampleCrops);
  }
}

async function startServer() {
  try {
    await connectDB(MONGO_URI);
    await seedMongoData();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('MongoDB unavailable, falling back to in-memory sample data');
    setMemoryMode(true);
    setInitialMemoryData(sampleCrops);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
