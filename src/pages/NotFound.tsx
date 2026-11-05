import { Link } from 'react-router-dom'

function NotFound(){
    return(
        <main className="page-shell">
            <section className="not-found-card">
                <span className="not-found-number">404 · PAGE NOT FOUND</span>
                <h1>Well, this is a dead end.</h1>
                <p>The page you’re looking for may have moved or may not exist.</p>
                <Link className="button-link" to="/">Return home</Link>
            </section>
        </main>
    )

}

export default NotFound;
