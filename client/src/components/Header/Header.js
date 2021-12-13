import { Link, NavLink } from "react-router-dom";

const Header = props => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-success p-1">
            <Link className="navbar-brand" to='/'>Job Listings</Link>
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/jobs'>Jobs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/employers'>Employers</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;