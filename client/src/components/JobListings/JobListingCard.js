import RoundImage from "../UI/RoundImage"
import moment from 'moment'
import { Link } from "react-router-dom"

const JobListingCard = props => {

    const tags = props.job.tags.split(',').map(tag =>
        <div key={tag} className="badge bg-primary mx-1">{tag.trim()}</div>)

    return (
        <div className="card m-3 p-0 rounded-0 shadow-sm">
            <div className="card-body p-1 ps-3 d-flex">
                <div style={{ margin: 'auto 0' }}>
                    <RoundImage width='100px' src='https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg' />
                </div>
                <div className="title m-3">
                    <Link className="link-dark" style={{textDecoration:'none'}} to={'/jobs/'+props.job.id}><b>{props.job.title}</b></Link>
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
                        <div className="badge bg-secondary mx-1">
                            {props.job.seniority}
                        </div>
                        {tags}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListingCard