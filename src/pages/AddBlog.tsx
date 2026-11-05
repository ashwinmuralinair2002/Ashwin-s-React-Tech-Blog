import { useState, type FormEvent } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { db } from '../firebase'
import { validateBlogText } from '../utils/blogValidation'
import toast from 'react-hot-toast'

function AddBlog() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextTitleError = validateBlogText(title, 'Title', 3, 120)
    const nextContentError = validateBlogText(content, 'Content', 20, 10000)
    setTitleError(nextTitleError)
    setContentError(nextContentError)
    if (nextTitleError || nextContentError) return
    if (!user) {
      toast.error('You must be logged in to publish an article.')
      return
    }
    if (!user.email) {
      toast.error('Your account does not have an email address available.')
      return
    }

    setSaving(true)
    try {
      await addDoc(collection(db, 'blogs'), {
        title: title.trim(),
        content: content.trim(),
        authorId: user.uid,
        authorEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      toast.success('Article published successfully.')
      navigate('/')
    } catch (error) {
      console.error('Unable to publish blog:', error)
      toast.error('The article could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="page-shell editor-page">
      <span className="eyebrow">Your workspace</span>
      <h1>Write a new article</h1>
      <p className="lead">Draft a title and story to share with your readers.</p>
      <section className="form-card">
        <form className="form-fields" onSubmit={handleSubmit} noValidate>
          <label className="field">Article title<input type="text" placeholder="Give your article a title" value={title} maxLength={120} onChange={(event) => { setTitle(event.target.value); setTitleError('') }} aria-invalid={Boolean(titleError)} aria-describedby={titleError ? 'title-error' : undefined} />{titleError && <span id="title-error" className="field-error" role="alert">{titleError}</span>}</label>
          <label className="field">Article content<textarea placeholder="Start writing your story..." value={content} maxLength={10000} onChange={(event) => { setContent(event.target.value); setContentError('') }} aria-invalid={Boolean(contentError)} aria-describedby={contentError ? 'content-error' : undefined} />{contentError && <span id="content-error" className="field-error" role="alert">{contentError}</span>}</label>
          <button type="submit" disabled={saving}>{saving ? 'Publishing...' : 'Publish article'}</button>
        </form>
      </section>
    </main>
  )
}

export default AddBlog;
