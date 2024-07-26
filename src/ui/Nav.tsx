import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/search/">Search</Link>
            </li>
        </nav>

    )
}
