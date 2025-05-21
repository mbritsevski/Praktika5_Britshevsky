import React from 'react';
import { useNavigate } from 'react-router-dom';

export function BookCard({ book }) {
  const navigate = useNavigate();

  const title = book?.title || '—';
  const authors = Array.isArray(book.Authors)
    ? book.Authors.map(a => a.name || a).join(', ')
    : book.Authors || book.authors || '—';
  const genre = Array.isArray(book.Categories)
    ? book.Categories.map(g => g.name || g).join(', ')
    : book.Categories || book.genre || book.category || '—';
  const year = book.publicationYear || book.year || '—';

  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{title}</h3>
      <p><strong>Author:</strong> {authors}</p>
      <p><strong>Category:</strong> {genre}</p>
      <p><strong>Published year:</strong> {year}</p>
    </div>
  );
}