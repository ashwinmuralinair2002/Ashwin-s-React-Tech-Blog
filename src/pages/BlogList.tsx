import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../auth/AuthContext'

type Blog = {
  id: string
  title: string
  content: string
  authorEmail: string
  authorId: string
  createdAt: Timestamp | null
}

function BlogList() {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadBlogs() {
      setLoading(true)
      setError('')
      try {
        const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(blogsQuery)
        const results = snapshot.docs.map((document) => {
          const data = document.data()
          return {
            id: document.id,
            title: typeof data.title === 'string' ? data.title : 'Untitled article',
            content: typeof data.content === 'string' ? data.content : '',
            authorEmail: typeof data.authorEmail === 'string' ? data.authorEmail : 'Unknown author',
            authorId: typeof data.authorId === 'string' ? data.authorId : '',
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
          }
        })
        if (isCurrent) setBlogs(results)
      } catch (loadError) {
        console.error('Unable to load blogs:', loadError)
        if (isCurrent) setError('Articles could not be loaded. Please refresh the page to try again.')
      } finally {
        if (isCurrent) setLoading(false)
      }
    }

    void loadBlogs()
    return () => { isCurrent = false }
  }, [])

  return (
    <main className="page-shell">
      <span className="eyebrow">Ideas, notes &amp; discoveries</span>
      <h1>Thoughts on technology<br />and the things we build.</h1>
      <p className="lead">A place for practical lessons, experiments, and reflections from the ever-changing world of technology.</p>
      {user && <div className="home-actions"><Link className="button-link" to="/dashboard/add-blog">Add Blog</Link></div>}
      <h2 className="section-heading">Latest articles</h2>
      {loading ? <section className="empty-card" aria-live="polite"><p>Loading articles...</p></section> : null}
      {!loading && error ? <section className="empty-card" role="alert"><p>{error}</p></section> : null}
      {!loading && !error && blogs.length === 0 ? <section className="empty-card" aria-label="Blog posts">
        <h2>New stories are on the way</h2>
        <p>There are no published posts yet. Check back soon for articles and project notes.</p>
      </section> : null}
      {!loading && !error && blogs.length > 0 ? <section className="blog-grid" aria-label="Blog posts">
        {blogs.map((blog) => {
          const preview = blog.content.length > 240 ? `${blog.content.slice(0, 240).trimEnd()}…` : blog.content
          const date = blog.createdAt?.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) ?? 'Date unavailable'
          return <article className="blog-card" key={blog.id}>
            <p className="blog-meta">{blog.authorEmail} <span aria-hidden="true">·</span> {date}</p>
            <h2><Link to={`/blog/${blog.id}`}>{blog.title}</Link></h2>
            <p className="blog-preview">{preview}</p>
            <Link className="read-link" to={`/blog/${blog.id}`}>Read article <span aria-hidden="true">→</span></Link>
            {user?.uid === blog.authorId ? <Link className="read-link" to={`/dashboard/edit-blog/${blog.id}`}>Edit article</Link> : null}
          </article>
        })}
      </section> : null}
    </main>
  )
}

export default BlogList;
