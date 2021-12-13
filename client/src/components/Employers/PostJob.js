import { useEffect, useState } from 'react';/*
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';*/

const PostJob = props => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [location, setLocation] = useState('');
    const [seniority, setSeniority] = useState('Any seniority');
    const [tags, setTags] = useState('');
    const [fieldOfWork, setFieldOfWork] = useState('');
    const [linkToApply, setLinkToApply] = useState('');
    const [locations, setLocations] = useState([]);
    const [fieldsOfWork, setFieldsOfWork] = useState([]);
    const [addingLocation, setAddingLocation] = useState(false);
    const [addingFieldOfWork, setAddingFieldOfWork] = useState(false);

    useEffect(() => {
        fetch('https://localhost:44318/api/locations')
            .then(res => res.json())
            .then(data => setLocations(data));
    }, [])

    useEffect(() => {
        fetch('https://localhost:44318/api/fieldsOfWork')
            .then(res => res.json())
            .then(data => setFieldsOfWork(data));
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        const job={
            title,
            description,
            dateCreated: new Date(),
            deadline,
            employerId:1,
            location,
            seniority,
            tags,
            fieldOfWork,
            linkToApply
        }
        
        fetch('https://localhost:44318/api/joblistings',{
            method:'POST',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-type':'application/json'
            },
            body:JSON.stringify(job)
        })
        .then(res=>console.log(res))
    }

    return (
        <form onSubmit={handleSubmit} className="my-5">
            <h2>Post New Job</h2>
            <div className="form-group">
                <label htmlFor="title">Job Title </label>
                <input className="form-control" onChange={e => setTitle(e.target.value)} id='title' name='title' type='text' value={title} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" onChange={e => setDescription(e.target.value)} id='description'
                    name='description' type='text' value={description} />
            </div>
            <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input className="form-control" id='deadline' name='deadline' type='date'
                    onChange={e => setDeadline(e.target.value)} value={deadline} />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                {addingLocation && <input type='text'
                    placeholder='New location...' value={location}
                    onChange={e => setLocation(e.target.value)}
                    className='form-control' />}
                {!addingLocation &&
                    <select className='form-select' name='location'>
                        <option value=''>Any location</option>
                        <option onClick={() => setAddingLocation(true)} value='Add New Location'>
                            Add new location
                        </option>
                        {locations.map(l => <option value={l.name}>{l.name}</option>)}
                    </select>}
            </div>
            <div className="form-group">
                <label htmlFor="seniority">Seniority</label>
                <select className="form-select" id='seniority' name='seniority' onChange={(e) => setSeniority(e.target.value)} >
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
                    placeholder='New field...' value={fieldOfWork}
                    onChange={e => setFieldOfWork(e.target.value)}
                    className='form-control' />}
                {!addingFieldOfWork &&
                    <select className='form-select' name='fieldOfWork'>
                        <option value=''>Any field of work</option>
                        <option onClick={() => setAddingFieldOfWork(true)} value='Add New Field Of Work'>
                            Add new field of work
                        </option>
                        {fieldsOfWork.map(f => <option value={f.name}>{f.name}</option>)}
                    </select>}
            </div>
            <div className="form-group">
                <label htmlFor="linkToApply">Link to apply </label>
                <input className="form-control"
                    id='linkToApply' name='linkToApply' type='text'
                    onChange={e => setLinkToApply(e.target.value)}
                    value={linkToApply} />
            </div>
            <div className="form-group">
                <label htmlFor="tags">Tags </label>
                <input className="form-control"
                    onChange={e => setTags(e.target.value)}
                    placeholder='Add comma separated tags'
                    id='tags' name='tags' type='text' value={tags} />
            </div>
            <div className='form-group d-flex justify-content-center'>
                <input type='submit' className='btn btn-secondary my-3 px-5' value='Post Job' />
            </div>
        </form>
    )
}

export default PostJob;