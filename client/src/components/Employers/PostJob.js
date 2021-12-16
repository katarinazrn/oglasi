import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import JobsContext from '../../store/jobs-context';
import JobForm from './JobForm';

const PostJob = props => {

    const jobs_context = useContext(JobsContext);
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

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


    if (!ctx.isLoggedIn) {
        navigate('/employers/login')
    }

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