import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import JobForm from './JobForm';

const PostJob = props => {
    
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    const [job, setJob] = useState({
        employerId: ctx.user.id,
        title: '',
        description: '',
        deadline: new Date(),
        location: '',
        seniority: 'Any seniority',
        tags: '',
        fieldOfWork: '',
        linkToApply: '',
        locations: [],
        fieldsOfWork: [],
        addingLocation: false,
        addingFieldOfWork: false
    });

    useEffect(() => {
        if (props.job) {
            setJob(props.job)
        }
    }, [props.job])


    if (!ctx.isLoggedIn) {
        return navigate('/employers/login');
    }

    const handleSubmit = e => {
        e.preventDefault();

        fetch('https://localhost:44318/api/joblistings', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(job)
        })
            .then(res => res.json()
            )
            .then(data => {
                props.addJob(data)
                navigate('/employers/' + ctx.user.id)
            })
    }

    const handleChange = (event) => {
        setJob(prevState => {
            let newState = {
                ...prevState,
                [event.target.name]: event.target.value
            };

            return newState;
        });
    }

    return (
        <div className="my-5">
            <JobForm
                job={job}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                type='Post'
            />
        </div>
    )
}

export default PostJob;