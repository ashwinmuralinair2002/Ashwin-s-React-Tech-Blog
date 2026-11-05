function BlogList() {
  return (
    <main className="page-shell">
      <span className="eyebrow">Ideas, notes &amp; discoveries</span>
      <h1>Thoughts on technology<br />and the things we build.</h1>
      <p className="lead">A place for practical lessons, experiments, and reflections from the ever-changing world of technology.</p>
      <h2 className="section-heading">Latest articles</h2>
      <section className="empty-card" aria-label="Blog posts">
        <h2>New stories are on the way</h2>
        <p>There are no published posts yet. Check back soon for articles and project notes.</p>
      </section>
    </main>
  )
}

export default BlogList;
