import { createContext, useState, useEffect } from "react";

const EmployersContext = createContext({
    employers: [],
    addEmployer: (employer) => { },
    searchTerm: '',
    setSearchTerm: () => { }
})

export const EmployersContextProvider = props => {

    const [employers, setEmployers] = useState([])
    const [allEmployers, setAllEmployers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetch('https://localhost:44318/api/employers',{
            method:'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                data=data.sort((a,b)=> (''+a.name).localeCompare(''+b.name))
                setEmployers(data)
                setAllEmployers(data)
            })

    }, [])

    useEffect(() => {
        setSearchTerm(prev=>prev.trim())
        let newEmployers = [...allEmployers];
        newEmployers = newEmployers.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setEmployers(newEmployers);
    }, [searchTerm])

    useEffect(() => {

        let newEmployers = [...allEmployers];
        newEmployers = newEmployers.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setEmployers(newEmployers);

    }, [allEmployers])

    const addEmployer = employer => {
        setAllEmployers(prev => {
            let newEmployers = [...prev];
            newEmployers.push(employer);
            return newEmployers;
        })

        setEmployers(prev => {
            let newEmployers = [...prev];
            newEmployers.push(employer);
            return newEmployers;
        })
    }



    const context = {
        employers: employers,
        addEmployer: addEmployer,
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm
    }

    return (
        <EmployersContext.Provider value={context}>
            {props.children}
        </EmployersContext.Provider>
    )
}

export default EmployersContext;