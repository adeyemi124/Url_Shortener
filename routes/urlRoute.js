const express = require('express');
const router = express.Router();
const Url = require("../model/urlModel");
const { customAlphabet } = require('nanoid'); // Import nanoid


//! Create an alphabet of your choice (optional)
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 6); // Generates an ID of 8 characters




//! POST endpoint to shorten a URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  //! Check if originalUrl exists
  if (!originalUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const urlCode = nanoid();
  const shortUrl = `${baseUrl}/${urlCode}`;

  try {
    let url = await Url.findOne({ originalUrl });

    if (url) {
      res.json(url);
    } else {
      url = new Url({ originalUrl, shortUrl, date: new Date() });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;
