function EditBlog() {
  return (
    <main className="page-shell editor-page">
      <span className="eyebrow">Your workspace</span>
      <h1>Edit article</h1>
      <p className="lead">Make changes to your draft. Article editing will be available when blog storage is connected.</p>
      <section className="form-card">
        <form className="form-fields" onSubmit={(event) => event.preventDefault()}>
          <label className="field">Article title<input type="text" placeholder="Article title" /></label>
          <label className="field">Article content<textarea placeholder="Article content" /></label>
          <button type="button" disabled>Save changes (coming soon)</button>
        </form>
      </section>
    </main>
  )
}

export default EditBlog;
