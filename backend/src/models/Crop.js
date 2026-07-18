const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    sowingDate: { type: Date, required: true },
    harvestingDate: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    farmerName: { type: String, default: 'Farmer' },
    farmerPhone: { type: String, default: 'Not provided' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crop', cropSchema);
