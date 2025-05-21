import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/api';

export function NewBookPage() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [authors, setAuthors] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (role !== 'Admin') {
      navigate('/');
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBook({
      title,
      publicationYear: year,
      authors: authors.split(',').map(a => a.trim()),
      genre: genre.split(',').map(g => g.trim())
    });

    navigate('/');
  };

  return (
    <div className="book-form-container">
      <button onClick={() => navigate('/')}>Go back</button>
      <h2>Add new book</h2>
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
          <button type="submit">Add book</button>
        </div>
      </form>
    </div>
  );
}