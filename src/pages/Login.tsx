
import { useState, type FormEvent } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate('/')

    } catch (error) {
      console.error(error)
      setError('Login failed. Check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="form-page">
      <section className="form-card">
      <span className="eyebrow">Welcome back</span>
      <h1>Log in</h1>
      <p className="form-intro">Sign in to continue to your account.</p>
      <form className="form-fields" onSubmit={handleLogin}>
        <label className="field">Email address<input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /></label>
        <label className="field">Password<input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /></label>
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
      <p className="form-footer">New here? <Link to="/signup">Create an account</Link></p>
      </section>
    </main>
  )
}

export default Login
