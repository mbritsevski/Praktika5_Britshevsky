import React, { useEffect, useState } from 'react';
import { getComments, addComment, deleteComment } from '../services/api';

export function CommentSection({ bookId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const role = localStorage.getItem('role');

useEffect(() => {
  async function loadComments() {
    const res = await getComments(bookId);
    setComments(res.data.comments);
  }

  loadComments();
}, [bookId]);

  const loadComments = async () => {
    if (!bookId) return;
    try {
      const res = await getComments(bookId);
      setComments(res.data.comments);
    } catch (err) {
      console.error('Error loading comments:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(bookId, newComment);
      setNewComment('');
      loadComments();
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete comment?')) {
      try {
        await deleteComment(id);
        loadComments();
      } catch (err) {
        console.error('Error deleting comment:', err);
      }
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>Comments</h4>
      <ul>
        {Array.isArray(comments) && comments.map((c) => (
          <li key={c.id}>
            <strong>{c.User?.username || '—'}</strong>: {c.content}
            {role === 'Admin' && (
              <button
                onClick={() => handleDelete(c.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add comment"
          rows={3}
          style={{ width: '100%' }}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}