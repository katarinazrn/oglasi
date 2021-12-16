import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({
    user: {},
    login: () => { },
    logout: () => { },
    isLoggedIn: false
});

export const AuthContextProvider = (props) => {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem('isLoggedIn')){
            setUser(JSON.parse(localStorage.getItem('user')))
            setIsLoggedIn(true)
        }
    },[])

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
                setUser(data)
                setIsLoggedIn(true)
                localStorage.setItem('user',JSON.stringify(data))
                localStorage.setItem('isLoggedIn','true')
            })
            .catch(m => {
                console.log(m)
            })
    }

    const logout = () => {
        setUser(null)
        setIsLoggedIn(false)
        localStorage.clear()
    }

    const context={
        isLoggedIn,
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
