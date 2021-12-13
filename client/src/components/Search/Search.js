import { useEffect, useState } from "react"

const Search = props => {

    const locations = [
        { id: 1, name: "Novi Sad" },
        { id: 2, name: "Beograd" },
        { id: 3, name: "Mala krsna" },
        { id: 4, name: "Bor" },
        { id: 5, name: "Sremska Mitrovica" }
    ]

    const field_of_work = [
        { id: 1, name: "Education" },
        { id: 2, name: "IT" }
    ]

    const [location, setLocation] = useState('');
    const [seniority, setSeniority] = useState('');
    const [field, setField] = useState('');
    const [titleOrKeyword, setTitleOrKeyword] = useState('');


    useEffect(() => {
        props.filter(location, seniority, field, titleOrKeyword)
    }, [location, seniority, field])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.filter(location, seniority, field, titleOrKeyword)
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-1">
            <div className="form-group m-1 d-flex">
                <input className="form-control me-2" onChange={(e) => setTitleOrKeyword(e.target.value)} type='search' placeholder="Job title or keyword..." />
                <input className="btn btn-secondary" type="submit" value="Search" />
            </div>
            <div className="d-flex">
                <select className="form-select m-1" name='location' onChange={(e) => setLocation(e.target.value)} >
                    <option className="form-control" value=''>Any location</option>
                    {locations.map(location =>
                        <option key={location.name} className="form-control" value={location.name}>{location.name}</option>
                    )}
                </select>
                <select className="form-select m-1" name='field_of_work' onChange={(e) => setField(e.target.value)} >
                    <option className="form-control" value=''>Any field of work</option>
                    {field_of_work.map(field =>
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