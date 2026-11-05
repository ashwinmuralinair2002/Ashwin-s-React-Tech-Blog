import Navbar from './components/navbar'
import Login from './pages/Login'
import AddBlog from './pages/AddBlog'
import BlogList from './pages/BlogList'
import EditBlog from './pages/EditBlog'
import BlogDetails from './pages/BlogDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import NotFound from './pages/NotFound'
import Signup from './pages/auth/Signup'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'



function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
      <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<BlogList />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='edit-blog/:id' element={<EditBlog />} />
          </Route>
          <Route path='/add-blog' element={<AddBlog />} />
          <Route path='/edit-blog/:id' element={<EditBlog />} />
          </Route>
          <Route path='/' element={<BlogList />}></Route>
          <Route element={<GuestRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/blog/:id' element={<BlogDetails />}></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


