import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from '../../store/auth-context';

const Header = props => {
    const ctx = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary p-1">
            <NavLink className="navbar-brand" to='/'>
                <b>Job Listings</b>
            </NavLink>
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse  navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/jobs'>Jobs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/employers/' >Employers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/employers/post-job'>Post a job</NavLink>
                    </li>
                    {ctx.isLoggedIn && <NavLink className="nav-link" to={'/employers/' + ctx.user.id}>Profile</NavLink>}
                    {!ctx.isLoggedIn && <li className="nav-item">
                        <NavLink className="nav-link" to='/employers/login' > Login As Employer</NavLink>
                    </li>}
                </ul>
                {ctx.isLoggedIn &&
                    <div className="nav-link p-0 d-flex p-sm-1" >
                        <span>{ctx.user.name}</span>
                        <span className="material-icons ms-2 h-auto" style={{cursor:'pointer'}}
                            onClick={() => { ctx.logout() }}>logout</span>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Header;