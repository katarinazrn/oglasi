import RoundImage from "../UI/RoundImage"
import moment from 'moment'
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import JobsContext from "../../store/jobs-context";
import ConfirmModal from "../UI/ConfirmModalcopy";


const JobListingCard = props => {

    const [showModal, setShowModal] = useState(false);

    const ctx = useContext(AuthContext);
    const jobs_context = useContext(JobsContext);

    const navigate = useNavigate();

    const tags = props.job.tags.split(',').map(tag =>
        <div key={tag} className="badge bg-info mx-1 btn" onClick={() => {
            jobs_context.setSearchTerm(tag.trim())
        }}>{tag.trim()}</div>)

    if (!props.job || !props.employer) {
        return <div>Loading..</div>
    }

    const deleteJob = () => {
        jobs_context.deleteJob(props.job);
        setShowModal(false)
    }

    return (
        <div className="row my-3 p-1 rounded-0 shadow-sm border d-flex justify-content-between">
            {showModal && <ConfirmModal show={true} message='Are you sure you want to delete this job listing?'
                    action={deleteJob}
                    id={props.job.id}
                    cancel={() => setShowModal(false)} />}
            <div className="col">
                <div className="row p-1 ps-3 d-md-flex">
                    <Link className="col-sm-4  p-0 d-flex justify-content-center mx-auto mx-md-0 my-auto  btn text-dark" style={{ textDecorations: 'none' }} to={'/employers/' + props.employer.id}>
                        <RoundImage width='110px' src={
                            props.employer && props.employer.imageUrl ? 'https://localhost:44318/uploads/' + props.employer.imageUrl :
                                'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg'} />
                    </Link>
                    <div className="col-sm-8 p-1 text-center text-sm-start">
                        <Link className="link-dark h4" style={{ textDecoration: 'none' }} to={'/jobs/' + props.job.id}>
                            <b>{props.job.title}</b>
                        </Link>
                        <p><Link className="p-0 m-0 btn text-dark" style={{ textDecorations: 'none' }} to={'/employers/' + props.employer.id}>{props.employer.name}</Link></p>
                        <p className="p-0 my-2 d-flex align-middle justify-content-sm-start justify-content-center ">
                            {props.job.location &&
                                <span className="material-icons opacity-50">
                                    location_on
                                </span>}
                            <span>
                                {props.job.location}
                            </span>
                            {props.job.deadline && <span className="material-icons  mx-1 opacity-50">
                                watch_later
                            </span>}
                            {moment(new Date(props.job.deadline)).format("MMMM DD, YYYY")}
                        </p>
                        <div className="tags">
                            <div className="badge bg-success mx-1 btn" style={{ cursor: 'default' }}>
                                {props.job.seniority}
                            </div>
                            {tags}
                        </div>
                    </div>
                </div>
            </div>
            {ctx.isLoggedIn && ctx.user.id == props.employer.id &&
                <div className="col-sm-auto my-auto d-flex flex-column p-2">
                    <button type="button" className="btn btn-danger m-1" onClick={() => setShowModal(true)}>
                        Delete
                    </button>
                    <button className="btn btn-success m-1" onClick={() => navigate('/employers/post-job/' + props.job.id)}>Edit</button>
                </div>
            }
        </div>
    )
}

export default JobListingCard