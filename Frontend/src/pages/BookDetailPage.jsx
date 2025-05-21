import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, deleteBook } from '../services/api';
import { CommentSection } from '../components/CommentSection';

export function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await getBook(id);
        setBook(res.data);
      } catch (err) {
        console.error('Error loading book:', err);
      }
    }
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are You sure about deleting the book?')) {
      await deleteBook(id);
      navigate('/');
    }
  };

  if (!book) return <p>Loading...</p>;

  const authors = Array.isArray(book.Authors)
    ? book.Authors.map(a => a.name || a).join(', ')
    : book.Authors || book.authors;

  const genre = Array.isArray(book.Categories)
    ? book.Categories.map(g => g.name || g).join(', ')
    : book.Categories || book.genre || book.category;

  const year = book.publicationYear || book.year;

  return (
    <div className="book-detail">
      <button onClick={() => navigate('/')}>Go back</button>

      <h2>{book.title}</h2>
      <div className="info">
        <p><strong>Author:</strong> {authors}</p>
        <p><strong>Category:</strong> {genre}</p>
        <p><strong>Published:</strong> {year}</p>
      </div>

      {role === 'Admin' && (
        <div className="action-buttons">
          <button onClick={() => navigate(`/edit/${id}`)}>Edit book</button>
          <button onClick={handleDelete}>Delete book</button>
        </div>
      )}

      <div className="comment-section">
        <CommentSection bookId={id} />
      </div>
    </div>
  );
}