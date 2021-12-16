import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import JobsContext from "../../store/jobs-context";
import JobForm from "./JobForm";

const EditJob = props => {
    const [job, setJob] = useState({});
    
    const jobs_context = useContext(JobsContext);
    const ctx = useContext(AuthContext);
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setJob(jobs_context.allJobs.filter(x => x.id == parseInt(params.id))[0]);
    }, [])


    if (!ctx.isLoggedIn) {
        return navigate('/employers/login');
    }

    const handleSubmit = e => {
        e.preventDefault();
        jobs_context.updateJob(job);
        navigate(-1);
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
                type='Save Changes'
            />
        </div>
    )

}

export default EditJob;