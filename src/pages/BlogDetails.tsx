import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../auth/AuthContext'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

type BlogDetailsData = {
  title: string
  content: string
  authorEmail: string
  authorId: string
  createdAt: Timestamp | null
}

function BlogDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [blog, setBlog] = useState<BlogDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true
    async function loadBlog() {
      if (!id) {
        setError('This article could not be found.')
        setLoading(false)
        return
      }
      try {
        const snapshot = await getDoc(doc(db, 'blogs', id))
        if (!isCurrent) return
        if (!snapshot.exists()) {
          setError('This article could not be found.')
          return
        }
        const data = snapshot.data()
        setBlog({
          title: typeof data.title === 'string' ? data.title : 'Untitled article',
          content: typeof data.content === 'string' ? data.content : '',
          authorEmail: typeof data.authorEmail === 'string' ? data.authorEmail : 'Unknown author',
          authorId: typeof data.authorId === 'string' ? data.authorId : '',
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
        })
      } catch (loadError) {
        console.error('Unable to load article:', loadError)
        if (isCurrent) setError('This article could not be loaded. Please try again later.')
      } finally {
        if (isCurrent) setLoading(false)
      }
    }
    void loadBlog()
    return () => { isCurrent = false }
  }, [id])

  async function handleDelete() {
    if (!id || !blog || !user || user.uid !== blog.authorId) {
      toast.error('You do not have permission to delete this article.')
      return
    }

    setDeleting(true)
    try {
      const confirmation = await Swal.fire({
        title: 'Delete this article?',
        text: `“${blog.title}” will be permanently deleted. This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete article',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        focusCancel: true,
      })
      if (!confirmation.isConfirmed) return

      const articleRef = doc(db, 'blogs', id)
      const latestSnapshot = await getDoc(articleRef)
      if (!latestSnapshot.exists()) {
        toast.error('This article has already been deleted.')
        navigate('/')
        return
      }

      await deleteDoc(articleRef)
      toast.success('Article deleted successfully.')
      navigate('/')
    } catch (deleteError) {
      console.error('Unable to delete article:', deleteError)
      toast.error('The article could not be deleted. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  const date = blog?.createdAt?.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) ?? 'Date unavailable'

  return (
    <main className="page-shell">
      <article className="article-card">
        {loading ? <p aria-live="polite">Loading article...</p> : null}
        {!loading && error ? <><h1 className="article-title">Article unavailable</h1><p role="alert">{error}</p><Link to="/">Return to all articles</Link></> : null}
        {!loading && blog ? <>
          <span className="eyebrow">Article</span>
          <h1 className="article-title">{blog.title}</h1>
          <div className="article-meta">By {blog.authorEmail} <span aria-hidden="true">·</span> {date}</div>
          {user?.uid === blog.authorId ? <div className="article-actions"><Link className="button-link" to={`/dashboard/edit-blog/${id}`}>Edit article</Link><button className="danger-button" type="button" onClick={handleDelete} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete article'}</button></div> : null}
          <div className="article-copy">{blog.content.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        </> : null}
        <p className="form-footer"><Link to="/">← Back to all articles</Link></p>
      </article>
    </main>
  )
}

export default BlogDetails;
