import { useEffect, useState, useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import JobsContext from '../../store/jobs-context';
import JobForm from './JobForm';

const PostJob = props => {

    const jobs_context = useContext(JobsContext);
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!ctx.isLoggedIn) navigate('/employers/login');
    },[]);

    const [job, setJob] = useState({
        employerId: -1,
        title: '',
        description: '',
        deadline: new Date(),
        dateCreated: new Date(),
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
        if (ctx.user) {
            setJob(prevState => {
                let newState = {
                    ...prevState,
                    employerId: ctx.user.id
                };

                return newState;
            });
        }

    }, [props.job])

    const handleSubmit = e => {
        e.preventDefault();
        jobs_context.addJob(job)
        navigate('/employers/' + ctx.user.id)
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

    if(!ctx.isLoggedIn){
        return <Fragment></Fragment>
    }

    return (
        <div className="my-5">
            <h1>Create job post</h1>
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