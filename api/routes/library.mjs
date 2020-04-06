import express from "express";
import libraryService from "../../lib/library/library_service.mjs";

const router = new express.Router();

router.get('/api/authors', async function(req, res) {
  return res.json([]);
});

router.get('/api/books', async function(req, res) {
  const {q} = req.query;
  const books = await libraryService.findAllBooks(q);
  return res.json(books);
});

router.post('/api/books', async function (req, res) {
  res.json([]);
});

export default router;
