const bulkGrid = document.getElementById('bulk-grid');
const minQuantityInput = document.getElementById('minQuantity');

function bulkCard(crop) {
  const image = crop.images?.[0] || '/assets/images/placeholder.svg';
  return `
  <div class="col-md-6">
    <div class="card custom-card h-100">
      <div class="row g-0">
        <div class="col-4">
          <img class="crop-image w-100 h-100" src="${image}" alt="${crop.cropName}" />
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5>${crop.cropName}</h5>
            <p class="mb-1">${crop.quantity} kg available at ₹${crop.price}/kg</p>
            <p class="mb-1 text-muted">${crop.location}</p>
            <p class="mb-0"><strong>Contact:</strong> ${crop.farmerName || 'Farmer'} (${crop.farmerPhone || 'N/A'})</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

async function loadBulk(minQuantity = 500) {
  bulkGrid.innerHTML = '<p class="text-muted">Loading bulk produce...</p>';
  try {
    const crops = await apiRequest(`/crops/bulk?minQuantity=${minQuantity}`);
    bulkGrid.innerHTML = crops.length
      ? crops.map(bulkCard).join('')
      : '<p class="text-muted">No bulk produce available for the selected quantity.</p>';
  } catch (error) {
    bulkGrid.innerHTML = `<p class="text-danger">${error.message}</p>`;
  }
}

if (bulkGrid) {
  document.getElementById('bulk-filter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    loadBulk(minQuantityInput.value || 500);
  });
  loadBulk();
}
