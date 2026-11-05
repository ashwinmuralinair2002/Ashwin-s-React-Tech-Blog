function AddBlog() {
  return (
    <main className="page-shell editor-page">
      <span className="eyebrow">Your workspace</span>
      <h1>Write a new article</h1>
      <p className="lead">Draft a title and story below. Publishing will be available when blog storage is connected.</p>
      <section className="form-card">
        <form className="form-fields" onSubmit={(event) => event.preventDefault()}>
          <label className="field">Article title<input type="text" placeholder="Give your article a title" /></label>
          <label className="field">Article content<textarea placeholder="Start writing your story..." /></label>
          <button type="button" disabled>Publish article (coming soon)</button>
        </form>
      </section>
    </main>
  )
}

export default AddBlog;
