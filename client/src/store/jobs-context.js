import { createContext, useState, useEffect } from "react";

const JobsContext = createContext({
    allJobs: [],
    filteredJobs: [],
    addJob: (job) => { },
    deleteJob: (id) => { },
    updateJob: (job) => { },
    filter: (location, seniority, fieldOfWork, titleOrKeyword) => { },
    setSearchTerm: (term) => { },
    searchTerm: ''
})

export const JobsContextProvider = props => {

    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://localhost:44318/api/joblistings')
            .then(res => res.json())
            .then(data => {
                data = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
                setAllJobs(data);
                setFilteredJobs(data);
            })
    }, []);

    const addJob = job => {
        fetch('https://localhost:44318/api/joblistings', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },

            body: JSON.stringify(job)
        })
            .then(res => res.json())
            .then(data => {
                setAllJobs(prev => {
                    let newJobs = [...prev]
                    newJobs.push(data);
                    return newJobs;
                })
            })

    }

    const deleteJob = job => {
        fetch('https://localhost:44318/api/joblistings/' + job.id, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(job)
        })
            .then(res => res.json())
            .then(data => {
                setAllJobs(prev => prev.filter(x => x.id != job.id))
                setFilteredJobs(prev => prev.filter(x => x.id != job.id));
            })
    }

    const updateJob = job => {
        fetch('https://localhost:44318/api/joblistings/' + job.id, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(job)
        })
            .then(data => {
                setAllJobs(prev => prev.map(x => x.id != job.id ? x : job));
                setFilteredJobs(prev => prev.filter(x => x.id != job.id ? x : job));
            })
            .catch(m => console.log(m))
    }

    const filter = (location, seniority, fieldOfWork, titleOrKeyword) => {

        let jobListings = [...allJobs];

        if (location.trim() != "") {
            jobListings = jobListings.filter(x => x.location.toLowerCase() === location.toLowerCase() || x.location.toLowerCase()==='any location');
        }

        if (seniority.trim() != "") {
            jobListings = jobListings.filter(x => x.seniority.toLowerCase() === seniority.toLowerCase() ||x.seniority.toLowerCase()==='any seniority' );
        }

        if (fieldOfWork.trim() != "") {
            if (fieldOfWork !== 'Any field of work')
                jobListings = jobListings.filter(x => x.fieldOfWork.toLowerCase() === fieldOfWork.toLowerCase() || x.fieldOfWork.toLowerCase()==='any field of work');
        }

        if (titleOrKeyword && titleOrKeyword.trim() != "") {
            jobListings = jobListings.filter(x => x.title.toLowerCase().includes(titleOrKeyword.toLowerCase())
                || x.tags.toLowerCase().includes(titleOrKeyword.toLowerCase()));
        }

        setFilteredJobs(jobListings);
    }

    const context = {
        allJobs: allJobs,
        filteredJobs: filteredJobs,
        addJob: addJob,
        deleteJob: deleteJob,
        updateJob: updateJob,
        filter: filter,
        setSearchTerm: setSearchTerm,
        searchTerm: searchTerm
    }

    return (
        <JobsContext.Provider value={context} >
            {props.children}
        </JobsContext.Provider >
    )
}

export default JobsContext;