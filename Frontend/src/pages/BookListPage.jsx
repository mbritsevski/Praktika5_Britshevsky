import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../services/api";
import { BookCard } from "../components/BookCard";
import { SearchBar } from "../components/SearchBar";

export function BookListPage() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [, setSearch] = useState({ title: "", author: "", genre: "" });
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      try {
        const res = await getBooks();
        setBooks(res.data.books);
        setFiltered(res.data.books);
      } catch (err) {
        console.error("Error loading books:", err);
      }
    }
    fetchData();
  }, [navigate]);

  const handleSearch = ({ title, author, genre }) => {
    setSearch({ title, author, genre });
    const lower = (s) => s.toLowerCase();

    const result = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(lower(title));

      const authorMatch = Array.isArray(book.Authors)
        ? book.Authors.some((a) =>
            lower(a.name || a).includes(lower(author))
          )
        : false;

      const categoryMatch = Array.isArray(book.Categories)
        ? book.Categories
            .map((c) => c.name || c)
            .join(", ")
            .toLowerCase()
            .includes(lower(genre))
        : (book.genre || "").toLowerCase().includes(lower(genre));

      return titleMatch && authorMatch && categoryMatch;
    });

    setFiltered(result);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleAddBook = () => {
    navigate("/new");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>List of books</h2>
        <div>
          {role === "Admin" && (
            <>
              <button onClick={handleAddBook} style={{ marginRight: "1rem" }}>
                Add new book
              </button>
              <button
                onClick={() => navigate("/logs")}
                style={{ marginRight: "1rem" }}
              >
                Show logs
              </button>
            </>
          )}
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      {!Array.isArray(filtered) || filtered.length === 0 ? (
        <p>No books found</p>
      ) : (
        filtered.map((book) => <BookCard key={book.id} book={book} />)
      )}
    </div>
  );
}
