import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const JobForm = props => {

    const [locations, setLocations] = useState([]);
    const [fieldsOfWork, setFieldsOfWork] = useState([]);
    const [addingLocation, setAddingLocation] = useState(false);
    const [addingFieldOfWork, setAddingFieldOfWork] = useState(false);

    const navigate=useNavigate();

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

    return (
        <form onSubmit={props.handleSubmit} >
            <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input className="form-control" onChange={props.handleChange}
                    id='title' name='title' type='text' value={props.job.title} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" onChange={props.handleChange} id='description'
                    name='description' type='text' value={props.job.description} />
            </div>
            <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input className="form-control" id='deadline' name='deadline' type='date'
                    onChange={props.handleChange} value={moment(new Date(props.job.deadline)).format('YYYY-MM-DD')} />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                {addingLocation && <input type='text'
                    placeholder='New location...' value={props.job.location}
                    onChange={props.handleChange}
                    name='location'
                    className='form-control' />}
                {!addingLocation &&
                    <select onChange={props.handleChange} className='form-select'
                        name='location'>
                        <option value=''>Any location</option>
                        <option onClick={() => setAddingLocation(true)} value='Add New Location'>
                            Add new location
                        </option>
                        {locations.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
                    </select>}
            </div>
            <div className="form-group">
                <label htmlFor="seniority">Seniority</label>
                <select className="form-select" id='seniority' name='seniority'
                    onChange={props.handleChange} 
                    value={props.job.seniority} >
                    <option value=''>Any seniority</option>
                    <option value='internship'>Internship</option>
                    <option value="junior">Junior</option>
                    <option value='medior'>Medior</option>
                    <option value='senior'>Senior</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="fieldOfWork">Field of work</label>
                {addingFieldOfWork && <input type='text'
                    placeholder='New field...' value={props.job.fieldOfWork}
                    onChange={props.handleChange} 
                    name='fieldOfWork'
                    className='form-control' />}
                {!addingFieldOfWork &&
                    <select onChange={props.handleChange}  className='form-select' name='fieldOfWork'>
                        <option value=''>Any field of work</option>
                        <option onClick={() => setAddingFieldOfWork(true)} value='Add New Field Of Work'>
                            Add new field of work
                        </option>
                        {fieldsOfWork.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                    </select>}
            </div>
            <div className="form-group">
                <label htmlFor="linkToApply">Link to apply </label>
                <input className="form-control"
                    id='linkToApply' name='linkToApply' type='text'
                    onChange={props.handleChange} 
                    value={props.job.linkToApply} />
            </div>
            <div className="form-group">
                <label htmlFor="tags">Tags </label>
                <input className="form-control"
                    onChange={props.handleChange} 
                    placeholder='Add comma separated tags'
                    id='tags' name='tags' type='text' value={props.job.tags} />
            </div>
            <div className='form-group d-flex justify-content-center'>
                <input type='submit' className='btn btn-info my-3 px-3' value={props.type} />
                <input type='button' className='btn btn-secondary my-3 ms-2 px-3' value='Cancel' onClick={()=>navigate(-1)} />
            </div>
        </form>
    )
}

export default JobForm;