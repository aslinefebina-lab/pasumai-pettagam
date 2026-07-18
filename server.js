// server.js
// Simple proxy to fetch Agmarknet (or other official pages) and return JSON
// Usage: GET /api/prices?state=Tamil%20Nadu&commodity=Tomato
// Note: run with `node server.js` after installing dependencies (express, axios, cheerio, cors)

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple health
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// Example endpoint: fetch market daily page from Agmarknet or CMDAC Chennai
// We'll try 2 sources: 1) Agmarknet state commodity page (HTML) OR 2) Chennai Vegetable wholesale page (fallback)
app.get('/api/prices', async (req, res) => {
  try {
    const state = (req.query.state || 'Tamil Nadu').trim();
    // For robustness, use Agmarknet's marketwise daily table (example page)
    // Agmarknet's web GUI pages present HTML tables; we will attempt to fetch a common listing page
    // NOTE: Agmarknet may require specific query parameters; this proxy scrapes a common Agmarknet page result if available.
    // We attempt a few known endpoints:
    const agmarkBase = 'https://agmarknet.gov.in';
    const agmarkCommodityUrl = `${agmarkBase}/PriceAndArrivals/CommodityWisePrice.aspx?StateName=${encodeURIComponent(state)}`;

    // If Agmarknet blocks or fails, fallback to Tamil Nadu (agrimark.tn.gov.in) pages or city mandi pages
    let html;
    try {
      const r = await axios.get(agmarkCommodityUrl, { timeout: 12000 });
      html = r.data;
    } catch (err) {
      // fallback to a Tamil Nadu portal or Chennai rates page (example)
      const fallbackUrl = 'https://cmdachennai.gov.in/CommodityRate/CommodityRateToday.aspx';
      const r = await axios.get(fallbackUrl, { timeout: 12000 });
      html = r.data;
    }

    // parse HTML and extract table rows containing (commodity, market, min, max, modal, date)
    const $ = cheerio.load(html);
    const results = [];

    // Try several common table selectors; adapt if the site's structure differs
    $('table').each((i, table) => {
      const headerText = $(table).prev('h3').text().trim().toLowerCase() + ' ' + $(table).attr('id');
      // parse rows
      $(table).find('tr').each((ri, row) => {
        const cells = $(row).find('td');
        if (cells.length >= 4) {
          const columns = [];
          cells.each((ci, cell) => columns.push($(cell).text().trim().replace(/\s+/g, ' ')));
          // heuristic mapping: try to map (commodity, min, max, modal, market, date)
          // push a best-effort object
          results.push({
            raw: columns
          });
        }
      });
    });

    // If results empty, try to extract from plain text that some sites use
    if (results.length === 0) {
      // try to find specific known rows for Chennai KWMC
      $('tr').each((i, tr) => {
        const tds = $(tr).find('td');
        if (tds.length >= 3) {
          const texts = [];
          tds.each((j, td) => texts.push($(td).text().trim()));
          if (texts.length) results.push({ raw: texts });
        }
      });
    }

    // Return a best-effort JSON. The frontend will interpret the raw rows into human-friendly items.
    res.json({
      source: 'agmarknet/data-scrape',
      state,
      timestamp: new Date(),
      count: results.length,
      rows: results
    });
  } catch (err) {
    console.error('fetch error', err && err.message);
    res.status(500).json({ error: 'Failed to fetch prices', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Market-proxy running on http://localhost:${PORT}`));
app.get("/api/buyer/shortlisted", (req, res) => {
    res.json([
        { product: "Tomatoes", price: "₹30/kg", seller: "Farmer A" },
        { product: "Onions", price: "₹25/kg", seller: "Farmer B" }
    ]);
});

app.get("/api/buyer/viewed", (req, res) => {
    res.json([
        { product: "Carrots", price: "₹20/kg", viewedOn: "2025-01-10" },
        { product: "Potatoes", price: "₹22/kg", viewedOn: "2025-01-11" }
    ]);
});

app.get("/api/buyer/orders", (req, res) => {
    res.json([
        { orderId: "ORD12345", item: "Tomatoes", status: "Delivered" },
        { orderId: "ORD54321", item: "Onions", status: "Pending" }
    ]);
});

app.get("/api/buyer/profile", (req, res) => {
    res.json({
        name: "Asline",
        location: "Tamil Nadu",
        phone: "9876543210",
        type: "Buyer"
    });
});
