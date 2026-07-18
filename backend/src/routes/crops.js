const express = require('express');
const Crop = require('../models/Crop');
const validateCrop = require('../utils/validateCrop');

const router = express.Router();

const inMemoryStore = [];
let useMemory = false;

function setMemoryMode(value) {
  useMemory = value;
}

async function listCrops({ q, category, minPrice, maxPrice }) {
  if (useMemory) {
    return inMemoryStore.filter((crop) => {
      const textMatch = !q || crop.cropName.toLowerCase().includes(q.toLowerCase());
      const categoryMatch = !category || crop.category.toLowerCase() === category.toLowerCase();
      const minMatch = minPrice === undefined || Number(crop.price) >= Number(minPrice);
      const maxMatch = maxPrice === undefined || Number(crop.price) <= Number(maxPrice);
      return textMatch && categoryMatch && minMatch && maxMatch;
    });
  }

  const filter = {};

  if (q) {
    filter.cropName = { $regex: q, $options: 'i' };
  }

  if (category) {
    filter.category = { $regex: `^${category}$`, $options: 'i' };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice !== undefined) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  return Crop.find(filter).sort({ createdAt: -1 });
}

router.get('/', async (req, res) => {
  const crops = await listCrops(req.query);
  res.json(crops);
});

router.get('/bulk', async (req, res) => {
  const minQuantity = Number(req.query.minQuantity || 500);
  const crops = useMemory
    ? inMemoryStore.filter((crop) => crop.quantity >= minQuantity)
    : await Crop.find({ quantity: { $gte: minQuantity } }).sort({ quantity: -1 });
  res.json(crops);
});

router.get('/:id', async (req, res) => {
  let crop;

  if (useMemory) {
    crop = inMemoryStore.find((item) => item._id === req.params.id);
  } else {
    crop = await Crop.findById(req.params.id);
  }

  if (!crop) {
    return res.status(404).json({ message: 'Crop not found' });
  }

  return res.json(crop);
});

router.post('/', async (req, res) => {
  const errors = validateCrop(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const payload = {
    ...req.body,
    quantity: Number(req.body.quantity),
    price: Number(req.body.price)
  };

  if (useMemory) {
    const crop = { ...payload, _id: String(Date.now()) };
    inMemoryStore.unshift(crop);
    return res.status(201).json(crop);
  }

  const crop = await Crop.create(payload);
  return res.status(201).json(crop);
});

router.put('/:id', async (req, res) => {
  const errors = validateCrop(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const payload = {
    ...req.body,
    quantity: Number(req.body.quantity),
    price: Number(req.body.price)
  };

  if (useMemory) {
    const index = inMemoryStore.findIndex((item) => item._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    inMemoryStore[index] = { ...inMemoryStore[index], ...payload };
    return res.json(inMemoryStore[index]);
  }

  const updated = await Crop.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true
  });

  if (!updated) {
    return res.status(404).json({ message: 'Crop not found' });
  }

  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  if (useMemory) {
    const index = inMemoryStore.findIndex((item) => item._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    inMemoryStore.splice(index, 1);
    return res.status(204).send();
  }

  const deleted = await Crop.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Crop not found' });
  }

  return res.status(204).send();
});

function setInitialMemoryData(data) {
  inMemoryStore.length = 0;
  data.forEach((item, index) => {
    inMemoryStore.push({ ...item, _id: `sample-${index + 1}` });
  });
}

module.exports = {
  router,
  setMemoryMode,
  setInitialMemoryData
};
