const models = require("../models");
const asyncHandler = require("express-async-handler");

const Book = models.Book;
const Author = models.Author;
const Category = models.Category;
const Comment = models.Comment;
const ActivityLog = models.ActivityLog;

// Admin: Loob uue raamatu
exports.createBook = async (req, res) => {
  try {
    const { title, publicationYear, authors, genre } = req.body;
    const book = await Book.create({ title, publicationYear });
    if (Array.isArray(authors)) {
      for (const name of authors) {
        const [author] = await Author.findOrCreate({ where: { name } });
        await book.addAuthor(author);
      }
    }

    if (Array.isArray(genre)) {
      for (const name of genre) {
        const [category] = await Category.findOrCreate({ where: { name } });
        await book.addCategory(category);
      }
    }


    const fullBook = await Book.findByPk(book.id, {
      include: [Author, Category]
    });

    res.status(201).json(fullBook);
  } catch (err) {
    console.error('Error creating a book', err);
    res.status(500).json({ message: err.message });
  }
};


// Admin: Kustutab raamatu ID järgi
exports.deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  await book.destroy();

  await ActivityLog.create({
    action: `Book "${book.title}" deleted`,
    details: `Book ID: ${book.id}`,
    userId: req.userId
  });

  res.status(200).json({ message: "Book deleted" });
});


// All users: tagastab kõik raamatud
exports.getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    include: [
      { model: Author, through: { attributes: [] } },
      { model: Category, through: { attributes: [] } },
    ]
  });

  res.status(200).json({ books });
});

// Admin: uuendab raamatu ID järgi

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, publicationYear, authors, genre } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.update({ title, publicationYear });

    if (Array.isArray(authors)) {
      const authorInstances = [];
      for (const name of authors) {
        const [author] = await Author.findOrCreate({ where: { name } });
        authorInstances.push(author);
      }
      await book.setAuthors(authorInstances);
    }


    if (Array.isArray(genre)) {
      const categoryInstances = [];
      for (const name of genre) {
        const [category] = await Category.findOrCreate({ where: { name } });
        categoryInstances.push(category);
      }
      await book.setCategories(categoryInstances);
    }

    const fullBook = await Book.findByPk(bookId, {
      include: [Author, Category]
    });

    res.status(200).json(fullBook);
  } catch (err) {
    console.error('Error editing a book', err);
    res.status(500).json({ message: err.message });
  }
};


// All users. tagastab kindlat raamatut
exports.getOneBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id, {
      include: ['Authors', 'Categories']
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};