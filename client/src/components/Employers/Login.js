import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate, Link } from 'react-router-dom';
import bg from '../../assets/bg.png';

const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        ctx.login(email, password);
    }

    if (ctx.isLoggedIn) {
        navigate(-1)
    }

    return (
        <form className='bg-success text-light fw-bold my-5 p-3 rounded' style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}
            onSubmit={handleSubmit}>
            <h1 className='text-light fw-bold text-center'>Login</h1>
            <div className='form-group'>
                <label>Email</label>
                <input className="form-control" type='text' onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input className="form-control" type='password' onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <div className='d-flex justify-content-center m-3'>
                <input className='btn btn-light px-3' type='submit' value='Login' />
            </div>
            <div className='text-center'>
                <Link to='/employers/register' style={{ textDecoration: 'none' }} className='text-light' >
                    Don't have an account yet? Sign Up.
                </Link>
            </div>
        </form>
    )
}

export default Login;