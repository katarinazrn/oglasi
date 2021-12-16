import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import JobForm from "./JobForm";

const EditJob = props => {
    const [job, setJob] = useState({});
    const params = useParams();

    useEffect(() => {
        if (props.jobs) {
            setJob(props.jobs.filter(x => x.id == parseInt(params.id))[0]);
        }
    }, [props.jobs])

    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    if (!ctx.isLoggedIn) {
        return navigate('/employers/login');
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetch('https://localhost:44318/api/joblistings/' + job.id, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
            body:JSON.stringify(job)
        })
            .then(data => {
                props.editJob(job)
                navigate(-1)
            })
            .catch(m=>console.log(m))
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