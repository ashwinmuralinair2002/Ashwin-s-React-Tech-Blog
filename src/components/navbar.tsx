import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function Navbar() {
    const { user } = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    async function handleLogout() {
        setError('')
        try {
            await signOut(auth)
            navigate('/login')
        } catch {
            setError('Logout failed. Please try again.')
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
      {error && <p className="form-error" role="alert">{error}</p>}
    </header>
  )
}

export default Navbar
