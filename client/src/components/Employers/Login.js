import { useState } from 'react';

const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        fetch('https://localhost:44318/api/employers/login',{
            method:'POST',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }

    return (
        <form className='bg-success text-light my-5 p-3 rounded' onSubmit={handleSubmit}>
            <h1 className='text-light text-center'>Login</h1>
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
        </form>
    )
}

export default Login;