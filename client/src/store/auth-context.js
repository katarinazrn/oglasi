import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({
    user: {},
    token:null,
    login: () => { },
    logout: () => { },
    isLoggedIn: false,
    message:'',
    clearMessage:()=>{}
});

export const AuthContextProvider = (props) => {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [message,setMessage]=useState('');

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn')) {
            setUser(JSON.parse(localStorage.getItem('user')));
            setToken(localStorage.getItem('token'));
            setIsLoggedIn(true);
        }
    }, [])

    const login = (email, password) => {
        fetch('https://localhost:44318/api/employers/login', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setIsLoggedIn(true);
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', data.token);
            })
            .catch(m => {
                setMessage('Error logging in');
            })
    }

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.clear();
    }

    const clearMessage=()=>{
        setMessage('')
    }

    const context = {
        isLoggedIn,
        user,
        token,
        login,
        logout,
        message,
        clearMessage
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
