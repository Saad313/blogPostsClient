// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main className="p-6">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/create" element={<BlogForm />} />
            <Route path="/edit/:id" element={<BlogForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
