# Pasumai Pettagam – Where Every Harvest Finds Its Worth

**Pasumai Pettagam** is a modern, responsive full-stack web platform that connects **Farmers**, **Buyers**, and **Stockists** directly without intermediaries.

## Tech Stack

- Frontend: HTML, CSS, JavaScript, Bootstrap 5
- Backend: Node.js, Express.js
- Database: MongoDB (with in-memory fallback for quick local demos)

## Folder Structure

- `frontend/` - Landing page, role-based login pages, dashboards, About and Contact pages
- `backend/` - Express API, crop model, validation, REST CRUD routes, sample data
- `assets/` - Agriculture-themed SVG images used in crop cards and landing UI

## Features

- Agriculture-themed responsive landing page
- Separate login pages for Farmer, Buyer, and Stockist
- Farmer dashboard to add crop details (name, category, quantity, price, sowing date, harvesting date, location, image)
- Buyer dashboard with browse/search/filter crop marketplace
- Stockist dashboard for bulk produce with farmer contact details
- Crop cards with image, pricing, quantity, and location
- About and Contact pages
- REST APIs for crop CRUD operations with server-side validation

## API Endpoints

- `GET /api/health`
- `GET /api/crops`
- `GET /api/crops/:id`
- `GET /api/crops/bulk?minQuantity=500`
- `POST /api/crops`
- `PUT /api/crops/:id`
- `DELETE /api/crops/:id`

## Run Locally

1. Install dependencies:
   ```bash
   cd /home/runner/work/pasumai-pettagam/pasumai-pettagam/backend
   npm install
   ```
2. Start MongoDB locally (optional but recommended), then run:
   ```bash
   npm start
   ```
3. Open:
   - `http://localhost:5000/index.html`

> If MongoDB is unavailable, the app automatically uses seeded in-memory sample data for hackathon demos.
