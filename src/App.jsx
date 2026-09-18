import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container pb-20 md:pb-12">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Routes>
          <Toaster />
        </main>
      </div>
    </BrowserRouter>
  );
}
