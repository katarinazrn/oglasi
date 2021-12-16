import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import SquareImage from "../UI/SquareImage";
import AuthContext from "../../store/auth-context";

const JobListingDetails = props => {

    const [job, setJob] = useState(null)
    const [employer, setEmployer] = useState(null)
    const params = useParams();

    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const id = params.id;
        setJob(props.jobs.filter(x => x.id == parseInt(id))[0]);
    }, [])

    useEffect(() => {
        if (job) {
            setEmployer(props.employers.filter(x => x.id == job.employerId)[0]);
        }
    }, [job])

    if (!job || !employer) {
        return <div>Loading...</div>
    }

    const tags = job.tags && job.tags.split(',').map(tag =>
        <div key={tag} className="badge bg-primary me-1" >
            {tag.trim()}
        </div>)

    return (
        <div className="mt-4 card m-3 p-2 rounded-0 shadow-sm">
            <div className="card-body">
                <div className="d-flex">
                    <div className="float-right me-3">
                        <Link className="p-0 m-0 btn text-dark" style={{ textDecorations: 'none' }} to={'/employers/' + employer.id}>
                            <SquareImage width='200px' src={
                                employer && employer.imageUrl ? 'https://localhost:44318/uploads/' + employer.imageUrl :
                                    'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg'} />
                        </Link>
                    </div>
                    <div>
                        <h1>{job.title}</h1>
                        <h4>
                            <Link className="p-0 m-0 btn text-dark" style={{ textDecorations: 'none' }} to={'/employers/' + employer.id}>
                                {employer.name}
                            </Link>
                        </h4>
                        {job.location && <p className="p-0 m-0">
                            Location: <b>{job.location}</b>
                        </p>}
                        {job.deadline && <p className="p-0 m-0">
                            Deadline: <b> {moment(new Date(job.deadline)).format("MMMM DD, YYYY")}</b>
                        </p>}
                        {job.fieldOfWork && <p className="p-0 m-0">
                            Field of work: <b>{job.fieldOfWork} </b>
                        </p>}
                        {job.seniority && <p className="p-0 m-0">
                            Seniority: <b>{job.seniority} </b>
                        </p>}
                        <div className="tags">
                            {tags}
                        </div>
                        {ctx.isLoggedIn && ctx.user.id == employer.id &&
                            <div className="my-auto d-flex  p-2">
                                <button className="btn btn-danger m-1" onClick={() => props.deleteJob(job.id)}>Delete</button>
                                <button className="btn btn-info m-1" onClick={() => navigate('/employers/post-job/' + job.id)}>Edit</button>
                            </div>
                        }
                    </div>
                </div>
                {job.description && <p className="border-top mt-3">{job.description}</p>}
                {job.linkToApply && <a onClick={() => window.location.href = job.linkToApply} className="btn btn-secondary">Apply</a>}
            </div>
        </div>
    )
}

export default JobListingDetails;