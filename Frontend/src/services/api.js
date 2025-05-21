import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});


export const login = (data) => API.post('/auth/signin', data);
export const register = (data) => API.post('/auth/signup', data);
export const getBooks = () => API.get('/books');
export const getBook = (id) => API.get(`/books/${id}`);
export const createBook = (data) => API.post('/books', data);
export const updateBook = (id, data) => API.put(`/books/${id}`, data);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const getComments = (bookId) => API.get(`/comments/${bookId}`);
export const addComment = (bookId, content) => API.post(`/comments/${bookId}`, { content });
export const deleteComment = (commentId) => API.delete(`/comments/${commentId}`);
export const getLogs = () => API.get('/logs');