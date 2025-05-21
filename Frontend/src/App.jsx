import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.jsx";
import { BookListPage } from "./pages/BookListPage.jsx";
import { BookDetailPage } from "./pages/BookDetailPage.jsx";
import { NewBookPage } from "./pages/NewBookPage.jsx";
import { EditBookPage } from "./pages/EditBookPage.jsx";
import { RegisterPage } from './pages/RegisterPage';
import { LogPage } from "./pages/Logpage.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/new" element={<NewBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logs" element={<LogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
