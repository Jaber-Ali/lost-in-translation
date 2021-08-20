import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main>
            <h2>404 Page not found</h2>
            <p>This page does not exist</p>
            <Link to="/">Back to start</Link>
        </main>
    )
}

export default NotFound;