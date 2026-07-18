const requiredFields = [
  'cropName',
  'category',
  'quantity',
  'price',
  'sowingDate',
  'harvestingDate',
  'location'
];

const toNumber = (value) => Number(value);

module.exports = (payload) => {
  const errors = [];

  requiredFields.forEach((field) => {
    if (payload[field] === undefined || payload[field] === null || payload[field] === '') {
      errors.push(`${field} is required`);
    }
  });

  if (payload.quantity !== undefined && Number.isNaN(toNumber(payload.quantity))) {
    errors.push('quantity must be a valid number');
  }

  if (payload.price !== undefined && Number.isNaN(toNumber(payload.price))) {
    errors.push('price must be a valid number');
  }

  if (toNumber(payload.quantity) < 0) {
    errors.push('quantity cannot be negative');
  }

  if (toNumber(payload.price) < 0) {
    errors.push('price cannot be negative');
  }

  if (payload.sowingDate && Number.isNaN(Date.parse(payload.sowingDate))) {
    errors.push('sowingDate must be a valid date');
  }

  if (payload.harvestingDate && Number.isNaN(Date.parse(payload.harvestingDate))) {
    errors.push('harvestingDate must be a valid date');
  }

  if (
    payload.sowingDate &&
    payload.harvestingDate &&
    Date.parse(payload.harvestingDate) < Date.parse(payload.sowingDate)
  ) {
    errors.push('harvestingDate must be later than sowingDate');
  }

  return errors;
};
