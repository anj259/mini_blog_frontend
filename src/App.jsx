import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './home'
import Register from './user/register'
import Login from './user/login'
import PostList from './posts/post_list'
import AddPost from './posts/create_post'
import PostByUser from './posts/postlist_byuser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/postbyuser/:id" element={<PostByUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
