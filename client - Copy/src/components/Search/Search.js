import { useEffect, useState } from "react"

const Search = props => {

    const [locations,setLocations]=useState([]);
    const [filedsOfWork,setFieldsOfWork]=useState([]);
    const [location, setLocation] = useState('');
    const [seniority, setSeniority] = useState('');
    const [field, setField] = useState('');

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
        props.filter(location, seniority, field)
    }, [location, seniority, field])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.filter(location, seniority, field);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-1">
            <div className="form-group m-1 d-flex">
                <input className="form-control me-2" onChange={(e) => props.searchTermChange(e.target.value)} 
                type='search' value={props.titleOrKeyword} placeholder="Job title or keyword..." />
                <input className="btn btn-secondary" type="submit" value="Search" />
            </div>
            <div className="d-flex">
                <select className="form-select m-1" name='location' onChange={(e) => setLocation(e.target.value)} >
                    <option className="form-control" value=''>Any location</option>
                    {locations.map(l =>
                        <option key={l.name} className="form-control" value={l.name}>{l.name}</option>
                    )}
                </select>
                <select className="form-select m-1" name='field_of_work' onChange={(e) => setField(e.target.value)} >
                    <option className="form-control" value=''>Any field of work</option>
                    {filedsOfWork.map(field =>
                        <option key={field.name} className="form-control" value={field.name}>{field.name}</option>
                    )}
                </select>
                <select className="form-select m-1" name='seniority' onChange={(e) => setSeniority(e.target.value)} >
                    <option value=''>Any seniority</option>
                    <option value='internship'>Internship</option>
                    <option value="junior">Junior</option>
                    <option value='medior'>Medior</option>
                    <option value='senior'>Senior</option>
                </select>
            </div>
        </form>
    )
}

export default Search;