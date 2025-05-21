import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, updateBook } from '../services/api';

export function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [authors, setAuthors] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    async function fetchBook() {
      const res = await getBook(id);
      const book = res.data;

      setTitle(book.title || '');
      setYear(book.publicationYear || book.year || '');
      setAuthors(Array.isArray(book.Authors)
        ? book.Authors.map(a => a.name || a).join(', ')
        : book.Authors || '');
      setGenre(Array.isArray(book.Categories)
        ? book.Categories.map(g => g.name || g).join(', ')
        : book.Categories || '');
    }

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateBook(id, {
      title,
      publicationYear: year,
      authors: authors.split(',').map(a => a.trim()),
      genre: genre.split(',').map(g => g.trim())
    });

    navigate(`/books/${id}`);
  };

  return (
    <div className="book-form-container">
      <button onClick={() => navigate('/')}>Go back</button>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label>Published Year:</label><br />
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </div>

        <div>
          <label>Author:</label><br />
          <input value={authors} onChange={(e) => setAuthors(e.target.value)} />
        </div>

        <div>
          <label>Category:</label><br />
          <input value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>

        <div>
          <button type="submit">Save changes</button>
          <button
            type="button"
            onClick={() => navigate(`/books/${id}`)}
            style={{ marginLeft: '1rem' }}
          >
            Discard changes
          </button>
        </div>
      </form>
    </div>
  );
}