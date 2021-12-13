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
                    <li className="nav-item dropdown">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Employers
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <NavLink to='/employers' className="dropdown-item" href="#">Meet Employers</NavLink>
                            <NavLink to='/employers/post-job' className="dropdown-item" href="#">Post a job</NavLink>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;