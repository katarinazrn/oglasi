import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from '../../store/auth-context';

const Header = props => {
    const ctx = useContext(AuthContext);
    
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-success p-1">
            <Link className="navbar-brand" to='/'>Job Listings</Link>
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse  navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/jobs'>Jobs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to='/employers/' >Employers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to='/employers/post-job'>Post a job</NavLink>
                    </li>
                </ul>
                {ctx.isLoggedIn &&
                    <div className="dropdown dropdown-pull-right me-5">
                        <button className="btn dropdown-toggle" type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            {ctx.user.name}
                        </button>
                        <div className="dropdown-menu me-5" aria-labelledby="dropdownMenuButton">
                            <Link to={'/employers/'+ctx.user.id} className="dropdown-item">
                                Profile
                            </Link>
                            <div className="dropdown-item" onClick={() => ctx.logout()}>
                                logout
                            </div>
                        </div>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Header;