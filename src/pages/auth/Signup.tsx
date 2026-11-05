import { useState, type FormEvent } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import GoogleSignInButton from '../../components/GoogleSignInButton'

function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('Account created successfully.')
      navigate('/')

    } catch (error) {
      console.error(error)
      toast.error('Signup failed. Please check your details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="form-page">
      <section className="form-card">
      <span className="eyebrow">Join the community</span>
      <h1>Create your account</h1>
      <p className="form-intro">Sign up to follow along and access your blog workspace.</p>
      <form className="form-fields" onSubmit={handleSignup}>
        <label className="field">Email address<input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /></label>
        <label className="field">Password<input
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /></label>
        <button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>
      </form>
      <GoogleSignInButton />
      <p className="form-footer">Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  )
}

export default Signup
