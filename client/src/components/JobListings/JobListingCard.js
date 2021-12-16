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
        <div key={tag} className="badge bg-primary mx-1 btn" onClick={() => {
            jobs_context.setSearchTerm(tag.trim())
        }}>{tag.trim()}</div>)

    if (!props.job || !props.employer) {
        return <div>Loading..</div>
    }

    const deleteJob = () => {
        jobs_context.deleteJob(props.job.id);
        setShowModal(false)
    }

    return (
        <div className=" m-3 p-0 rounded-0 shadow-sm border d-flex justify-content-between">
            {showModal && <ConfirmModal show={true} message='Are you sure you want to delete this job listing?'
                action={deleteJob}
                id={props.job.id}
                cancel={() => setShowModal(false)} />}
            <div className=" p-1 ps-3 d-flex">
                <div style={{ margin: 'auto 0' }}>
                    <Link className="p-0 m-0 btn text-dark" style={{ textDecorations: 'none' }} to={'/employers/' + props.employer.id}>
                        <RoundImage width='120px' src={
                            props.employer && props.employer.imageUrl ? 'https://localhost:44318/uploads/' + props.employer.imageUrl :
                                'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg'} />
                    </Link>
                </div>
                <div className="title m-3">
                    <Link className="link-dark" style={{ textDecoration: 'none' }} to={'/jobs/' + props.job.id}><b>{props.job.title}</b></Link>
                    <p><Link className="p-0 m-0 btn text-dark" style={{ textDecorations: 'none' }} to={'/employers/' + props.employer.id}>{props.employer.name}</Link></p>
                    <p className="p-0 my-2 d-flex align-middle">
                        <span className="material-icons opacity-50">
                            location_on
                        </span>
                        <span className="me-2">
                            {props.job.location}
                        </span>
                        <span className="material-icons me-1 opacity-50">
                            watch_later
                        </span>
                        {moment(new Date(props.job.deadline)).format("MMMM DD, YYYY")}
                    </p>
                    <div className="tags">
                        <div className="badge bg-secondary mx-1 btn" style={{ cursor: 'default' }}>
                            {props.job.seniority}
                        </div>
                        {tags}
                    </div>
                </div>
            </div>
            {ctx.isLoggedIn && ctx.user.id == props.employer.id &&
                <div className="my-auto d-flex flex-column p-2">
                    <button type="button" className="btn btn-danger m-1" onClick={() => setShowModal(true)}>
                        Delete
                    </button>
                    <button className="btn btn-info m-1" onClick={() => navigate('/employers/post-job/' + props.job.id)}>Edit</button>
                </div>
            }
        </div>
    )
}

export default JobListingCard