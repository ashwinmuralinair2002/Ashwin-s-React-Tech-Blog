import { useState, type FormEvent } from 'react'
import { FirebaseError } from 'firebase/app'
import {
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  type OAuthCredential,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { auth } from '../firebase'

function GoogleSignInButton() {
  const navigate = useNavigate()
  const [pendingCredential, setPendingCredential] = useState<OAuthCredential | null>(null)
  const [accountEmail, setAccountEmail] = useState('')
  const [password, setPassword] = useState('')
  const [working, setWorking] = useState(false)

  async function handleGoogleSignIn() {
    setWorking(true)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      toast.success('Signed in with Google.')
      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/account-exists-with-different-credential') {
        const credential = GoogleAuthProvider.credentialFromError(error)
        const email = (error.customData as { email?: string } | undefined)?.email
        if (credential && email) {
          setPendingCredential(credential)
          setAccountEmail(email)
          toast('This email already has an account. Sign in with its password below to link Google safely.')
        } else {
          toast.error('This email already has another sign-in method. Sign in with that method first.')
        }
      } else if (error instanceof FirebaseError && error.code === 'auth/credential-already-in-use') {
        toast.error('This Google account is already linked to another account. Accounts cannot be merged automatically.')
      } else {
        console.error('Google sign-in failed:', error)
        toast.error('Google sign-in failed. Please try again.')
      }
    } finally {
      setWorking(false)
    }
  }

  async function handleLinkGoogle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!pendingCredential || !accountEmail) return

    setWorking(true)
    try {
      const result = await signInWithEmailAndPassword(auth, accountEmail, password)
      if (result.user.email?.toLowerCase() !== accountEmail.toLowerCase()) {
        toast.error('The signed-in account does not match the Google account email.')
        return
      }

      await linkWithCredential(result.user, pendingCredential)
      toast.success('Google has been linked to your existing account.')
      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/credential-already-in-use') {
        toast.error('This Google account is already linked to another account. Accounts cannot be merged automatically.')
      } else if (error instanceof FirebaseError && ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(error.code)) {
        toast.error('That password did not match the existing account. Please try again.')
      } else {
        console.error('Unable to link Google account:', error)
        toast.error('Google could not be linked. Your existing account remains unchanged.')
      }
    } finally {
      setWorking(false)
    }
  }

  return (
    <div className="google-auth">
      <div className="auth-divider"><span>or</span></div>
      <button className="google-button" type="button" onClick={handleGoogleSignIn} disabled={working}>
        {working ? 'Please wait...' : 'Continue with Google'}
      </button>
      {pendingCredential && <form className="google-link-form" onSubmit={handleLinkGoogle}>
        <p>This email already has an account. Enter its password to verify ownership and link Google to the same account.</p>
        <label className="field">Account email<input type="email" value={accountEmail} readOnly /></label>
        <label className="field">Existing account password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        <button type="submit" disabled={working}>{working ? 'Linking...' : 'Verify and link Google'}</button>
      </form>}
    </div>
  )
}

export default GoogleSignInButton
