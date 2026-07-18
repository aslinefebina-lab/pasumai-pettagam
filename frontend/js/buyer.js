const cropGrid = document.getElementById('crop-grid');
const filterForm = document.getElementById('filter-form');

function cropCard(crop) {
  const image = crop.images?.[0] || '/assets/images/placeholder.svg';
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card custom-card h-100">
        <img class="crop-image" src="${image}" alt="${crop.cropName}" />
        <div class="card-body">
          <span class="badge badge-green mb-2">${crop.category}</span>
          <h5>${crop.cropName}</h5>
          <p class="mb-1"><strong>₹${crop.price}</strong> / kg</p>
          <p class="mb-1">Quantity: ${crop.quantity} kg</p>
          <p class="text-muted mb-0">${crop.location}</p>
        </div>
      </div>
    </div>`;
}

async function loadCrops(query = '') {
  cropGrid.innerHTML = '<p class="text-muted">Loading crops...</p>';
  try {
    const crops = await apiRequest(`/crops${query}`);
    if (!crops.length) {
      cropGrid.innerHTML = '<p class="text-muted">No crops found.</p>';
      return;
    }
    cropGrid.innerHTML = crops.map(cropCard).join('');
  } catch (error) {
    cropGrid.innerHTML = `<p class="text-danger">${error.message}</p>`;
  }
}

if (filterForm) {
  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(filterForm);
    const params = new URLSearchParams();
    ['q', 'category', 'minPrice', 'maxPrice'].forEach((key) => {
      const value = formData.get(key);
      if (value) {
        params.append(key, value);
      }
    });
    loadCrops(params.toString() ? `?${params.toString()}` : '');
  });

  loadCrops();
}
