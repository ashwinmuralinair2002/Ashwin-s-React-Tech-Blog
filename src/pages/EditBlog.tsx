import { useEffect, useState, type FormEvent } from 'react'
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { db } from '../firebase'
import { validateBlogText } from '../utils/blogValidation'
import toast from 'react-hot-toast'

type EditableBlog = {
  title: string
  content: string
  authorId: string
}

function EditBlog() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [blog, setBlog] = useState<EditableBlog | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')
  const [pageError, setPageError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let isCurrent = true
    async function loadBlog() {
      if (!id) {
        setPageError('This article could not be found.')
        setLoading(false)
        return
      }
      try {
        const snapshot = await getDoc(doc(db, 'blogs', id))
        if (!isCurrent) return
        if (!snapshot.exists()) {
          setPageError('This article could not be found.')
          return
        }
        const data = snapshot.data()
        const loadedBlog = {
          title: typeof data.title === 'string' ? data.title : '',
          content: typeof data.content === 'string' ? data.content : '',
          authorId: typeof data.authorId === 'string' ? data.authorId : '',
        }
        setBlog(loadedBlog)
        setTitle(loadedBlog.title)
        setContent(loadedBlog.content)
      } catch (error) {
        console.error('Unable to load article for editing:', error)
        if (isCurrent) setPageError('This article could not be loaded. Please try again later.')
      } finally {
        if (isCurrent) setLoading(false)
      }
    }
    void loadBlog()
    return () => { isCurrent = false }
  }, [id])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextTitleError = validateBlogText(title, 'Title', 3, 120)
    const nextContentError = validateBlogText(content, 'Content', 20, 10000)
    setTitleError(nextTitleError)
    setContentError(nextContentError)
    setPageError('')
    if (nextTitleError || nextContentError || !id || !blog) return
    if (!user || blog.authorId !== user.uid) {
      toast.error('You do not have permission to edit this article.')
      return
    }

    setSaving(true)
    try {
      await updateDoc(doc(db, 'blogs', id), {
        title: title.trim(),
        content: content.trim(),
        updatedAt: serverTimestamp(),
      })
      toast.success('Article updated successfully.')
      navigate(`/blog/${id}`)
    } catch (error) {
      console.error('Unable to update article:', error)
      toast.error('The article could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const isOwner = Boolean(user && blog && user.uid === blog.authorId)

  return (
    <main className="page-shell editor-page">
      <span className="eyebrow">Your workspace</span>
      <h1>Edit article</h1>
      {loading ? <p aria-live="polite">Loading article...</p> : null}
      {!loading && pageError && !blog ? <section className="empty-card" role="alert"><p>{pageError}</p><Link to="/">Return to all articles</Link></section> : null}
      {!loading && blog && !isOwner ? <section className="empty-card"><h2>Editing unavailable</h2><p>You can only edit articles you created.</p><p><Link to={`/blog/${id}`}>Return to article</Link></p></section> : null}
      {!loading && blog && isOwner ? <>
        <p className="lead">Update the title and content of your article.</p>
        <section className="form-card">
          <form className="form-fields" onSubmit={handleSubmit} noValidate>
            <label className="field">Article title<input type="text" placeholder="Give your article a title" value={title} maxLength={120} onChange={(event) => { setTitle(event.target.value); setTitleError('') }} aria-invalid={Boolean(titleError)} aria-describedby={titleError ? 'title-error' : undefined} />{titleError && <span id="title-error" className="field-error" role="alert">{titleError}</span>}</label>
            <label className="field">Article content<textarea placeholder="Write your article..." value={content} maxLength={10000} onChange={(event) => { setContent(event.target.value); setContentError('') }} aria-invalid={Boolean(contentError)} aria-describedby={contentError ? 'content-error' : undefined} />{contentError && <span id="content-error" className="field-error" role="alert">{contentError}</span>}</label>
            <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
          </form>
        </section>
      </> : null}
    </main>
  )
}

export default EditBlog
