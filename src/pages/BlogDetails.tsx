import { useParams } from "react-router-dom";

function BlogDetails() {
    const {id} = useParams()
  return (
    <main className="page-shell">
      <article className="article-card">
        <span className="eyebrow">Article</span>
        <h1 className="article-title">A story in progress</h1>
        <div className="article-meta">By Ashwin <span aria-hidden="true">·</span> Publication date to come <span aria-hidden="true">·</span> Article {id}</div>
        <div className="article-copy">
          <p>This article page is ready for its story. The blog content will appear here when posts are connected to the application.</p>
        </div>
      </article>
    </main>
  )
}

export default BlogDetails;
