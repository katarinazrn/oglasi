import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import moment from "moment";
import SquareImage from "../UI/SquareImage";

const JobListingDetails = props => {

    const [job, setJob] = useState(null)
    const params = useParams();

    useEffect(() => {
        const id = params.id;
        setJob(props.jobs.filter(x => x.id == parseInt(id))[0]);
    }, [props.jobs])


    if (!job) {
        return <div>Loading...</div>
    }

    const tags = job.tags && job.tags.split(',').map(tag =>
        <div key={tag} className="badge bg-primary me-1">{tag.trim()}</div>)

    return (
        <div className="mt-4 card m-3 p-2 rounded-0 shadow-sm">
            <div className="card-body">
                <div className="d-flex">
                    <div className="float-right me-3">
                        <SquareImage width='200px' src='https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg' />
                    </div>
                    <div>
                        <h1>{job.title}</h1>
                        <h4>ime firme</h4>
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
                    </div>
                </div>
                {job.description && <p className="border-top mt-3">{job.description}</p>}
                {job.linkToApply && <a href={job.linkToApply} className="btn btn-secondary">Apply</a>}
            </div>
        </div>
    )
}

export default JobListingDetails;