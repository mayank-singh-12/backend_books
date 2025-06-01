const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const Book = require("./models/books.model");
const app = express();
initializeDatabase();

app.use(express.json());

// api to get all books
async function getAllBooks() {
  const booksData = await Book.find();
  return booksData;
}

app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch {
    res.status(500).json({ error: "Error occured while fetching data." });
  }
});

// api to add a new book
async function addNewBook(newBook) {
  const book = new Book(newBook);
  const saveData = await book.save();
  return saveData;
}

app.post("/books", async (req, res) => {
  try {
    const savedData = await addNewBook(req.body);
    if (savedData) {
      res
        .status(200)
        .json({ message: "New Book saved successfully", book: savedData });
    } else {
      res.status(400).json({ error: "Error occured while saving new book." });
    }
  } catch {
    res.status(500).json({ error: "Failed to add new book" });
  }
});

// api to get detail by book title
async function getBookByTitle(bookTitle) {
  try {
    const book = await Book.findOne({ title: bookTitle });
    return book;
  } catch (error) {
    console.log("Found error while fetching book by title.", error);
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const bookData = await getBookByTitle(req.params.bookTitle);
    if (bookData) {
      res
        .status(200)
        .json({ message: "Book found successfully.", book: bookData });
    } else {
      res.status(404).json({ error: "book not found." });
    }
  } catch {
    res
      .status(500)
      .json({ error: "Found error while fetching book by title." });
  }
});

// api to get details of all the books by an author
async function getBooksByAuthor(bookAuthor) {
  try {
    const books = await Book.find({ author: bookAuthor });
    return books;
  } catch {
    console.log("Found error while fetching data.");
  }
}

app.get("/books/author/:bookAuthor", async (req, res) => {
  try {
    const booksData = await getBooksByAuthor(req.params.bookAuthor);
    if (booksData) {
      res.json(booksData);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch {
    res.status(500).json({ error: "Error occured while fetching books data." });
  }
});

// api to get books by genre
async function getBooksByGenre(bookGenre) {
  try {
    const books = await Book.find({ genre: bookGenre });
    return books;
  } catch (error) {
    console.log("Error occured while fetching books by genre:", error);
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const books = await getBooksByGenre(req.params.bookGenre);
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books data not found." });
    }
  } catch {
    res.status(500).json({ error: "Found errors while fetching booksData." });
  }
});

//api to get books by release year
async function getBooksByReleaseYear(bookReleaseYear) {
  try {
    const books = await Book.find({ publishedYear: bookReleaseYear });
    return books;
  } catch {
    console.log("Error occured while fetching books data.");
  }
}

app.get("/books/releaseYear/:bookReleaseYear", async (req, res) => {
  try {
    const bookData = await getBooksByReleaseYear(req.params.bookReleaseYear);
    if (bookData) {
      res.json(bookData);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch {
    res.status(500).json({ error: "Error occured while fetching books data." });
  }
});

// api to get book by id and update it's data
async function getBookByIdAndUpdate(bookId, dataToUpdate) {
  try {
    const updatebook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatebook;
  } catch (error) {
    console.log("Found error while updating books data.", error);
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await getBookByIdAndUpdate(req.params.bookId, req.body);
    if (updatedBook) {
      res.status(200).json({
        message: "Successfully updated Book data.",
        updatedData: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch {
    res.status(500).json({ error: "Error occured while fetching books data." });
  }
});

// api to get book by title and update it's data
async function getBookByTitle(bookTitle, dataToUpdate) {
  try {
    const updateBook = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updateBook;
  } catch (error) {
    console.log("Found error while updating books data.", error);
  }
}

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await getBookByTitle(req.params.bookTitle, req.body);
    if (updatedBook) {
      res.status(200).json({
        message: "Book updated successfully.",
        updatedData: updatedBook,
      });
    } else {
      res.status(400).json({ error: "Book does not exist." });
    }
  } catch {
    res.status(500).json({ error: "Found error while updating books data." });
  }
});

//api to delete book by id
async function getBookByIdAndDelete(bookId) {
  try {
    const deleteBook = await Book.findByIdAndDelete(bookId);
    return deleteBook;
  } catch (error) {
    console.log("Found error while finding book by id:", error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await getBookByIdAndDelete(req.params.bookId);
    if (deletedBook) {
      res.status(200).json({
        message: "Book deleted successfully.",
        deletedData: deletedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch {
    res.status(500).json({ error: "Error occured while " });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
