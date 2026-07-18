const cropForm = document.getElementById('crop-form');
const formStatus = document.getElementById('form-status');

if (cropForm) {
  cropForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(cropForm);
    const imageUrl = formData.get('imageUrl');

    const payload = {
      cropName: formData.get('cropName'),
      category: formData.get('category'),
      quantity: Number(formData.get('quantity')),
      price: Number(formData.get('price')),
      sowingDate: formData.get('sowingDate'),
      harvestingDate: formData.get('harvestingDate'),
      location: formData.get('location'),
      farmerName: formData.get('farmerName'),
      farmerPhone: formData.get('farmerPhone'),
      images: imageUrl ? [imageUrl] : ['/assets/images/placeholder.svg']
    };

    try {
      await apiRequest('/crops', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      formStatus.className = 'alert alert-success';
      formStatus.textContent = 'Crop listed successfully!';
      cropForm.reset();
    } catch (error) {
      formStatus.className = 'alert alert-danger';
      formStatus.textContent = error.message;
    }
  });
}
