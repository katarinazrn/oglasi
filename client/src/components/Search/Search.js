import { useEffect, useState, useContext } from "react";

import JobsContext from "../../store/jobs-context";

const Search = props => {

    const jobs_context = useContext(JobsContext);

    const [locations, setLocations] = useState([]);
    const [filedsOfWork, setFieldsOfWork] = useState([]);
    const [location, setLocation] = useState('');
    const [seniority, setSeniority] = useState('');
    const [field, setField] = useState('');
    const [titleOrKeyword, setTitleOrKeyword] = useState('')


    useEffect(() => {
        fetch('https://localhost:44318/api/locations')
            .then(res => res.json())
            .then(data => setLocations(data));
    }, [])

    useEffect(() => {
        fetch('https://localhost:44318/api/fieldOfWorks')
            .then(res => res.json())
            .then(data => setFieldsOfWork(data));
    }, [])

    useEffect(() => {
        jobs_context.filter(location, seniority, field, titleOrKeyword)
    }, [location, seniority, field])

    useEffect(() => {
        setTitleOrKeyword(jobs_context.searchTerm);
        jobs_context.filter(location, seniority, field, jobs_context.searchTerm);
    }, [jobs_context.searchTerm])

    const handleSubmit = (e) => {
        e.preventDefault()
        jobs_context.filter(location, seniority, field, titleOrKeyword);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 ">
            <div className="row">
                <div className="col-sm-10 p-0 pe-sm-2">
                    <input className="form-control" onChange={(e) => setTitleOrKeyword(e.target.value)}
                        type='search' value={titleOrKeyword} placeholder="Job title or keyword..." />
                </div>
                <div className="col-sm-2 p-0 mt-2 mt-sm-0">
                    <input className="btn btn-info w-100" type="submit" value="Search" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-sm-4 mt-1 mt-sm-0 m-sm-0 p-0 pe-sm-1">
                    <select className="form-select w-100" name='location' onChange={(e) => setLocation(e.target.value)} >
                        <option className="form-control" value=''>Any location</option>
                        {locations.map(l =>
                            <option key={l.name} className="form-control" value={l.name}>{l.name}</option>
                        )}
                    </select>
                </div>
                <div className="col-sm-4 mt-1 mt-sm-0 p-0 m-sm-0 pe-sm-1">
                    <select className="form-select" name='field_of_work' onChange={(e) => setField(e.target.value)} >
                        <option className="form-control" value=''>Any field of work</option>
                        {filedsOfWork.map(field =>
                            <option key={field.name} className="form-control" value={field.name}>{field.name}</option>
                        )}
                    </select>
                </div>
                <div className="col-sm-4 mt-1 mt-sm-0 m-sm-0 p-0">
                    <select className="form-select w-100" name='seniority' onChange={(e) => setSeniority(e.target.value)} >
                        <option value=''>Any seniority</option>
                        <option value='internship'>Internship</option>
                        <option value="junior">Junior</option>
                        <option value='medior'>Medior</option>
                        <option value='senior'>Senior</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default Search;