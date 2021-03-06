import express from "express";
import libraryService from "../../lib/library/library_service.mjs";

const router = new express.Router();

router.get('/api/authors', async function(req, res) {
  const authors = await libraryService.findAllAuthors();
  return res.json(authors);
});

router.get('/api/books', async function(req, res) {
  const {q} = req.query;
  const books = await libraryService.findAllBooks(q);
  return res.json(books);
});

router.post('/api/books', async function (req, res) {
  const input = req.body;
  const newBook = {
    title: input.title,
    description: input.description,
    author: input.author,
  };
  const [book, _isNew] = await libraryService.addBook(newBook);
  res.json(book);
});

export default router;
