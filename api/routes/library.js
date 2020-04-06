import express from "express";

const router = new express.Router();

router.get('/api/authors', async function(req, res) {
  return res.json([]);
});

router.get('/api/books', async function(req, res) {
  const {q} = req.query;
  return res.json([]);
});

router.post('/api/books', async function (req, res) {
  res.json([]);
});

export default router;
