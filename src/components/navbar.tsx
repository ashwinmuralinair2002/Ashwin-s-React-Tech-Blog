import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import toast from 'react-hot-toast'

function Navbar() {
    const { user } = useAuth()
    const navigate = useNavigate()
    async function handleLogout() {
        try {
            await signOut(auth)
            toast.success('Logged out successfully.')
            navigate('/login')
        } catch {
            toast.error('Logout failed. Please try again.')
        }
    }
  return (
    <header className="site-header">
      <nav className="nav-inner" aria-label="Main navigation">
      <Link className="brand" to="/">Ashwin's Tech Blog</Link>
      <div className="nav-links">
      <Link to="/">Home</Link>
      {user ? (
  <>
    {user.email && <span className="nav-user">{user.email}</span>}
    <button className="nav-logout" onClick={handleLogout}>Logout</button>
  </>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
  </>
)}
      </div>
      </nav>
    </header>
  )
}

export default Navbar
